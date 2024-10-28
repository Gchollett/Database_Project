var express = require('express');
const { PrismaClient } = require('@prisma/client');
const {z} = require('zod')
const authorize = require('../utilities/authorize');
// const 
var router = express.Router();

const prisma = new PrismaClient();

/* GET users listing. */
router.get('/',authorize(["Contractors"]), async function(req, res, next) {
    var query = {}
    console.log(prisma.job[req.query.sortby])
    if(["pay","title","start","end"].includes(req.query.sortby)){
        const orderByObject = {}
        orderByObject[req.query.sortby] = req.query.direction == "asc"?"asc":"desc"
        query = {...query,orderBy:orderByObject}
    }
    if(req.query.filter) query = {...query,where:JSON.parse(req.query.filter)}
    res.send(await prisma.job.findMany(query));
});


const jobSchema = z.object({
    title: z.string(),
    pay: z.number(),
    remote: z.boolean(),
    start: z.string().datetime(),
    end: z.string().datetime(),
    description: z.string()
})

router.post('/create', authorize(["Companies"]), async (req,res) => {
    const companyUser = res.locals.user
    const jobData = jobSchema.safeParse(req.body)
    if(!jobData.success){
        res.status(400).send("Bad Request")
        return;
    }
    prisma.job.create({
        data:{
            ...jobData.data,
            compid: companyUser.compid
        }
    }).then(res.status(201).send("Job Created"))
})

const jobDeletionSchema = z.object({
    jobid: z.number()
})

router.post('/delete',authorize(["Companies"]),async (req,res) => {
    const result = jobDeletionSchema.safeParse(req.body)
    console.log(result)
    if(!result.success){
        res.status(400).send("Bad Request")
        return;
    }
    prisma.job.delete({where:result.data}).then(res.status(200).send("Job Deleted"))
})

router.get('/:jobid',authorize(["Companies","Contractors"]),async (req,res) => {
    const job = await prisma.job.findUnique({where:{jobid:parseInt(req.params.jobid)}})
    if(!job){
        res.status(400).send("Job Does not Exist")
    }else{
        res.status(200).send(job)
    }
})

router.post('/:jobid/apply',authorize(["Contractors"]),async (req,res) => {
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
            if(result) res.status(200).send("Applied for Job")
        }catch(e){
            res.status(400).send("Already Applied for this Job")
        }
    }else res.status(400).send("Job Does not Exist")
})

module.exports = router;