var express = require('express');
const { PrismaClient } = require('@prisma/client');
const {z} = require('zod')
const authorize = require('../utilities/authorize');
// const 
var router = express.Router();

const prisma = new PrismaClient();

/**
 * @openapi
 * /applications:
 *  get:
 *      tags:
 *          - Application
 *      summary: "Gets the applications for Contractor Users that they have filed and gets the applications for Company Users for all jobs they have posted."
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            description: "Authentification Token"
 *            required: true
 *      responses:
 *          200:
 *              description: "The applications were successfully found."
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/applications"
 *          401:
 *              description: "Not Authorized"
 *          500:
 *              description: "Authorization Error"
 */
router.get('/',authorize(["Contractors","Companies"]), async (req,res) => {
    const user = res.locals.user
    if(user?.compid){
        res.status(200).send(await prisma.job.findMany({
            where:{
                compid: parseInt(user.compid)
            },
            select:{
                title: true,
                remote: true,
                pay: true,
                start:true,
                end:true,
                description:true,
                jobapplication:{
                    select:{
                        contractor:{
                            select:{
                                firstname:true,
                                lastname:true,
                                rate: true,
                                resume: true
                            }
                        }
                    }
                }
            }
        }))
    }else if(user?.contid){
        prisma.jobapplication.findMany({
            where:{
                contid: user.contid
            },
            select:{
                job:{
                    select:{
                        title:true,
                        remote:true,
                        pay:true,
                        start:true,
                        end:true,
                        description:true,
                        company:{
                            select: {
                                name:true
                            }
                        }
                    }
                },
                status:true
            }
        }).then(result => res.status(200).send(result))
    }else{
        res.status(500).send("Authorization Error")
    }
})
/**
 * @openapi
 * /applications/{jobid}:
 *  get:
 *      tags:
 *          - Application
 *      summary: "Get applications for the given job for authorized Company Users"
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
 *            description: "Id for the job"
 *            required: true
 *      responses:
 *          200:
 *              description: "Applications successfully found"
 *              content:
 *                  applicaiton/json:
 *                      schema:
 *                          $ref: "#/components/schemas/applications_jobid"
 *          400:
 *              description: "Job Does Not Exist"
 *          401:
 *              description: "Not Authorized"
 */
router.get('/:jobid',authorize(["Companies"]),async (req,res) => {
    const user = res.locals.user
    const verify = await prisma.job.findUnique({where:{jobid:parseInt(req.params.jobid)}})
    if(!verify || verify.compid != user.compid){
        res.status(400).send("Job Does Not Exist")
        return
    }
    res.status(200).send(await prisma.job.findUnique({
        where:{
            jobid:parseInt(req.params.jobid)
        },
        select:{
            title:true,
            remote:true,
            pay:true,
            start:true,
            end:true,
            description:true,
            jobapplication:{
                select:{
                    contractor:{
                        select:{
                            firstname:true,
                            lastname:true,
                            rate: true,
                            resume: true
                        }
                    }
                }
            }
        }
    }))
})

/**
 * @openapi
 * /appliactions/{jobid}/{contid}:
 *  get:
 *      tags:
 *          - Application
 *      summary: "Gets Application for the exact job and contractor for authorized Company Users."
 *      parameters:
 *          - in: path
 *            name: jobid
 *            schema:
 *              type: number
 *            description: "Id of Job"
 *            required: true
 *          - in: path
 *            name: contid
 *            schema:
 *              type: number
 *            description: "Id of Contactor"
 *            required: true
 *          - in: header
 *            name: token
 *            schema:
 *              type: string
 *            description: "Authentification Token"
 *            required: true
 *      responses:
 *          200:
 *              description: "Application Successfuly Found."
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/application_jobid_contid"
 *          400:
 *              description: "Application Does Not Exist."
 *          401:
 *              description: "Not Authorized"
 *          
 */
router.get('/:jobid/:contid',authorize(["Companies"]),async (req,res) => {
    const result = await prisma.jobapplication.findUnique({
        where:{
            contid_jobid:{
                contid: parseInt(req.params.contid),
                jobid: parseInt(req.params.jobid)
            }
        }
    })
    if(result){
        res.status(200).send(result)
    }else{
        res.status(400).send("Application Does Not Exist")
    }
})

const applicationStatusSchema = z.object({
    status: z.string()
})

/**
 * @openapi
 * /appliactions/{jobid}/{contid}:
 *  put:
 *      tags:
 *          - Application
 *      summary: "Authorized Companies can update application status."
 *      parameters:
 *          - in: path
 *            name: jobid
 *            schema:
 *              type: number
 *            description: "Id of Job"
 *            required: true
 *          - in: path
 *            name: contid
 *            schema:
 *              type: number
 *            description: "Id of Contactor"
 *            required: true
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
 *                          - status
 *                      properties:
 *                          status:
 *                              type: string
 *                              enum:
 *                                  - "Accepted"
 *                                  - "Rejected"
 *                              default: "Accepted"
 *      responses:
 *          200:
 *              description: "Application Successfuly Found."
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/application_jobid_contid"
 *          400:
 *              description: "Application Does Not Exist."
 *          401:
 *              description: "Not Authorized"
 *          
 */
router.put('/:jobid/:contid',authorize(["Companies"]),async (req,res) => {
    const status = applicationStatusSchema.safeParse(req.body)
    if(!status.success && !["Accepted","Rejected"].includes(status.data.status)){
        res.status(400).send("Bad Request")
        return;
    }
    const result = await prisma.jobapplication.findUnique({
        where:{
            contid_jobid:{
                contid: parseInt(req.params.contid),
                jobid: parseInt(req.params.jobid)
            }
        }
    })
    if(result){
        prisma.jobapplication.update({
            where:{
                contid_jobid:{
                    contid: parseInt(req.params.contid),
                    jobid: parseInt(req.params.jobid)
                }
            },
            data:{
                status: status.data
            }
        }).then(res.status(200).send("Application Updated"))
    }else res.status(400).send("Applicaiton Does Not Exist")
})

/**
 * @openapi
 * /applications/{jobid}/apply:
 *  post:
 *      tags:
 *          - Application
 *      summary: "Create application for Authorized User for job with Id"
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
 *            description: "Id for job"
 *            required: true
 *      responses:
 *          201:
 *              description: "Application Created"
 *          400:
 *              description: "Bad Request"
 *          401:
 *              description: "Not Authorized"
 *          404:
 *              description: "Job Does not Exist"   
 */
router.post('/:jobid/apply',authorize(['Contractors']),async (req,res) => {
    const user = res.locals.user;
    const jobid = parseInt(req.params.jobid)
    if(await prisma.job.findUnique({where:{jobid}})){
        try{
            const result = await prisma.jobapplication.create({
                data:{
                    contid: user.contid,
                    jobid,
                    status: "Pending"
                }
            })
            if(result) res.status(201).send("Applied for Job")
        }catch(e){
            res.status(400).send("Already Applied for this Job")
        }
    }else res.status(404).send("Job Does not Exist")
})

/**
 * @openapi
 * /applications/{jobid}/unapply:
 *  delete:
 *      tags:
 *          - Application
 *      summary: "Delete application for Authorized Users for the Job with the Id."
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
 *            description: "Id for job"
 *            required: true
 *      responses:
 *          200:
 *              description: "Successfully Deleted Application"
 *          400:
 *              description: "Bad Request"
 *          401:
 *              description: "Not Authorized"
 *              
 */
router.delete('/:jobid/unapply',authorize(["Contractors"]),async (req,res) => {
    const user = res.locals.user
    try{
        const result = await prisma.jobapplication.delete({
            where:{
                contid_jobid:{
                    contid: user.contid,
                    jobid: parseInt(req.params.jobid)
                }
            }
        })
        if(result)res.status(200).send("Unapplied for Job")
    }catch(e){
        res.status(400).send("You Have Not Applied to this Job")
    }
})

module.exports = router