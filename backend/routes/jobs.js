var express = require('express');
const { PrismaClient } = require('@prisma/client');
const {z} = require('zod')
const authorize = require('../utilities/authorize');
// const 
var router = express.Router();

const prisma = new PrismaClient();

/**
 * @openapi
 * /jobs:
 *  get:
 *      tags:
 *          - Job
 *      summary: "Gets all available jobs for Contractors and all posted jobs for Companies"
 *      parameters:
 *          - in: query
 *            name: sortby
 *            description: "Parameter to sort jobs by."
 *            schema:
 *              type: string
 *              enum:
 *                  - "pay"
 *                  - "title"
 *                  - "start"
 *                  - "end"
 *              default: pay
 *          - in: query
 *            name: filter
 *            description: "Stringified JSON filter"
 *            schema:
 *              type: string
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            description: "Authentification Token"
 *            required: true
 *      responses:
 *          200:
 *              description: "Successfully found jobs"
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/jobs"
 *          401:
 *              description: "Not Authorized"
 *          500:
 *              description: "Authentication Error"
 *            
 */
router.get('/',authorize(["Contractors","Companies"]), async function(req, res, next) {
    const user = res.locals.user
    if(user.compid){
        res.status(200).send(await prisma.job.findMany({where:{compid: user.compid},select:{jobid:true,title:true,pay:true,remote:true,start:true,end:true,description:true,jobtag:{select:{name:true}},company:{select:{name:true}}}}))
    }else if(user.contid){
        var query = {}
        if(["pay","title","start","end"].includes(req.query.sortby)){
            const orderByObject = {}
            orderByObject[req.query.sortby] = req.query.direction == "asc"?"asc":"desc"
            query = {...query,orderBy:orderByObject}
        }
        if(req.query.filter) query = {...query,where:JSON.parse(req.query.filter)}
        res.status(200).send(await prisma.job.findMany({...query,select:{
            jobid:true,
            title:true,
            pay:true,
            remote:true,
            start:true,
            end:true,
            description:true,
            jobtag:{
                select:{name:true}
            },
            company:{
                select:{name:true}
            },
            jobapplication:{
                where:{
                    status: "Accepted"
                },
                select:{
                    contractor: {
                        select:{
                            firstname:true,
                            lastname:true,
                            User:{
                                select:{
                                    username:true,
                                    email:true,
                                }
                            }
                        }
                    }
                }
            }
        }}));
    }else{
        res.status(500).send("Authorization Error")
    }
    
});


const jobSchema = z.object({
    title: z.string(),
    pay: z.number(),
    remote: z.boolean(),
    start: z.string().datetime(),
    end: z.string().datetime(),
    description: z.string(),
    jobtag: z.array(z.string())
})

/**
 * @openapi
 * /jobs/create:
 *  post:
 *      tags:
 *          - Job
 *      summary: "Authorized Company creates a job."
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            description: "Authentification Token"
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - title
 *                          - pay
 *                          - remote
 *                          - start
 *                          - end
 *                          - description
 *                          - tags
 *                      properties:
 *                          title:
 *                              type: string
 *                              default: "Software Engineer"
 *                          pay:
 *                              type: number
 *                              default: 5
 *                          remoute:
 *                              type: boolean
 *                              default: false
 *                          start:
 *                              type: string
 *                              default: "2020-01-01T00:00:00.000Z"
 *                          end:
 *                              type: string
 *                              default: "2020-01-02T00:00:00.000Z"
 *                          description:    
 *                              type: string
 *                              default: "You will build software."
 *                          tags:
 *                              type: array
 *                              default: ["Software"]
 *                          
 *      responses:
 *          201:
 *              description: "Job Successfully Created"
 *          400:
 *              description: "Improper Request Body"
 *          401:
 *              description: "Not Authroized"
 */
router.post('/create', authorize(["Companies"]), async (req,res) => {
    const companyUser = res.locals.user
    const jobData = jobSchema.safeParse(req.body)
    if(!jobData.success){
        res.status(400).send(`Bad Request with error: ${jobData.error}`)
        return;
    }
    prisma.job.create({
        data:{
            ...jobData.data,
            compid: companyUser.compid,
            jobtag: {create:jobData.data.jobtag.map((tag) => ({name:tag}))}
        }
    }).then(res.status(201).send("Job Created"))
})

/**
 * @openapi
 * /jobs/{jobid}/delete:
 *  delete:
 *      tags:
 *          - Job
 *      summary: "Authorized Company can delete jobs they have posted."
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            description: "Authentification Token"
 *            required: true
 *          - in: path
 *            name: jobid
 *            schema:
 *              type: number
 *            required: true
 *      responses:
 *          200:
 *              description: "Deleted Job Successfully"
 *          400:
 *              description: "Job Does Not Exist"
 *          401:
 *              description: "Not Authorized"
 *      
 */

router.delete('/:jobid/delete',authorize(["Companies"]),async (req,res) => {
    const user = res.locals.user
    const job = await prisma.job.findUnique({where:{jobid:parseInt(req.params.jobid),compid:user.compid}})
    if(!job){
        res.status(400).send("Bad Request")
        return;
    }
    await prisma.job.delete({where:{jobid:parseInt(req.params.jobid)}}).then(res.status(200).send("Job Deleted"))
})


/**
 * @openapi
 * /jobs/{jobid}:
 *  get:
 *      tags:
 *          - Job
 *      summary: "Gets the job with the Id for Authorized Users"
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            description: "Authentification Token"
 *            required: true
 *          - in: path
 *            name: jobid
 *            schema:
 *              type: number
 *            required: true
 *      responses:
 *          200:
 *              description: "Successfully found the job."
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/job"
 *          400:
 *              description: "Job Does Not Exist"
 *          401:
 *              description: "Not Authorized"
 */
router.get('/:jobid',authorize(["Companies","Contractors"]),async (req,res) => {
    const job = await prisma.job.findUnique({where:{jobid:parseInt(req.params.jobid)}})
    if(!job){
        res.status(400).send("Job Does not Exist")
    }else{
        if(res.locals.compid && res.locals.compid != job.compid) res.status(400).send("Not One of Your Jobs")
        res.status(200).send(job)
    }
})

router.get('/recommended',authorize(['Contractors']),async (req,res) => {
    const user = res.locals.user;
    prisma.job.findMany({
        where:{
            jobid:{
                notIn: prisma.jobapplication.findMany({where:{contid:user.contid}})
            },
            jobtag:{
                some: {
                    in: prisma.contractortag.findMany({where:{contid:user.contid}})
                }
            },
            start:{

            },
            end:{

            }
        }
    })
})

module.exports = router;