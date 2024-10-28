var express = require('express');
const { PrismaClient } = require('@prisma/client');
var router = express.Router();
const {z} = require('zod')
const {sign} = require('../utilities/token.js')
const {encode,decode} = require('../utilities/encoder.js');
const { token } = require('morgan');

const prisma = new PrismaClient();

const userCreationSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string()
})

router.post('/create',async (req,res) => {
  const result = userCreationSchema.safeParse(req.body)
  if(!result.success)res.status(400).send("Incorrect Request Body")
  else{
    if(await prisma.user.findUnique({where:{username:result.data.username}})){
      res.status(400).send("Username already exists")
      return
    }
    prisma.user.create({
      data: {
        username: result.data.username,
        password: endcode(result.data.password),
        email: result.data.email
      }
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
router.get('/:username', async function(req, res, next) {
  const user = await prisma.user.findUnique({
    where:{
      username: req.params.username
    },
    select:{
      username: true,
      email: true
    }
  })
  if(user) res.send(user);
  else {
    res.sendStatus(400)
  }
});

module.exports = router;
