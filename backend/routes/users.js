var express = require('express');
const { PrismaClient } = require('@prisma/client');
var router = express.Router();
const {z} = require('zod')
const {sign,parse} = require('../utilities/token.js')
const {encode,decode} = require('../utilities/encoder.js');
const authorize = require('../utilities/authorize.js');

const prisma = new PrismaClient();

const userCreationSchema = z.object({
  username: z.string().min(1),
  password: z.string(),
  email: z.string().email()
})

const contractorSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  rate: z.number()
})

const companySchema = z.object({
  name: z.string(),
})

router.post('/create',async (req,res) => {
  const result = userCreationSchema.safeParse(req.body)
  if(!result.success)res.status(400).send("Bad Request")
  else{
    if(await prisma.user.findUnique({where:{username:result.data.username}})){
      res.status(400).send("Username already exists")
      return
    }
    data = {
      username: result.data.username,
      password: encode(result.data.password),
      email: result.data.email
    }
    if(req.body.position == "Contractor"){
      const contractor = contractorSchema.safeParse(req.body)
      if(!contractor.success){
        res.status(400).send("Bad Request (Improper Contractor)")
        return;
      }
      else{
        data = {...data,contractor:{create:[contractor.data]}}
      }
    }else if(req.body.position == "Company"){
      const company = companySchema.safeParse(req.body)
      if(!company.success){
        res.status(400).send("Bad Request (Improper Company)")
        return;
      }
      else{
        data = {...data,company:{create:[company.data]}}
      }
    }else{
      res.status(400).send("Bad Request")
      return;
    }
    prisma.user.create({
      data
    }).then(res.status(201).send(sign(result.data.username)))
  }
})

const userLoginSchema = z.object({
  username: z.string(),
  password: z.string()
})

router.post('/login',async (req,res) => {
  const result = userLoginSchema.safeParse(req.body)
  if(!result.success)res.status(400).send("Incorrect Request Body")
  else{
    const user = await prisma.user.findUnique({where:{username:result.data.username}})
    if(!user)res.status(400).send("Username Does Not Exist")
    else if(decode(user.password) != result.data.password)res.status(400).send("Incorrect Password")
    else res.status(200).send(sign(user.username))
  }
})

/* GET users listing. */
router.get('/profile', authorize(["Contractors","Companies"]), async function(req, res, next) {
  const username = res.locals.user.username
  const user = await prisma.user.findUnique({
    where:{
      username:username
    },
    select:{
      username: true,
      email: true,
      contractor: {
        select: {
          firstname: true,
          lastname: true,
          resume: true,
          rate: true
        }
      },
      company: {
        select: {
          name: true
        }
      }
    }
  })
  if(user) res.send(user);
  else {
    res.sendStatus(400)
  }
});

module.exports = router;
