var express = require('express');
const { PrismaClient } = require('@prisma/client');
const {z} = require('zod')
const authorize = require('../utilities/authorize');
// const 
var router = express.Router();

const prisma = new PrismaClient();

router.get('/',authorize(["Contractors","Companies"]), async (req,res) => {
    const user = res.locals.user
    if(user?.compid){
        prisma.jobapplication.findMany({
            where:{
                job:{
                    is: {
                        compid: user.compid
                    }
                }
            }
        }).then(result => res.status(200).send(result))
    }else if(user?.contid){
        prisma.jobapplication.findMany({
            where:{
                contid: user.contid
            }
        }).then(result => res.status(200).send(result))
    }else{
        res.status(500).send("Authorization Error")
    }
})

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
        })
    }else res.status(400).send("Applicaiton Does Not Exist")
})

router.post('/:jobid/unapply',authorize(["Contractors"]),async (req,res) => {
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