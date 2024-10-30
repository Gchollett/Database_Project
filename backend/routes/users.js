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
  rate: z.number(),
  resume: z.string(),
  contractortag: z.array(z.string())
})

const companySchema = z.object({
  name: z.string(),
})


/**
 * @openapi
 * /users/create:
 *  post:
 *    tags:
 *      - User
 *    summary: "Create a Contractor or Company user"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *              - email
 *              - position
 *            properties:
 *              username: 
 *                type: string
 *                default: timdog
 *              password:
 *                type: string
 *                default: password
 *              email:
 *                type: email
 *                default: tim@dog.com
 *              position:
 *                type: string
 *                default: Contractor
 *              firstname:
 *                type: string
 *                default: Tim
 *              lastname:
 *                type: string
 *                defualt: Smith
 *              rate:
 *                type: number
 *                default: 5.5
 *              resume: 
 *                type: string
 *                default: "Knows React.js and Express.js"
 *              contractorTags:
 *                type: array
 *                default: ["Software"]
 *              name:
 *                type: string
 *                default: "Delta"
 *    responses:
 *      201:
 *        description: "User Created"
 *        content:
 *          application/json:
 *            schema: 
 *              type: string
 *              default: eyJhbGciOiJIUzI1NiJ9.VGltRG9n.V54ePDdiH6QvCfujHabncCS5jlWG7ayH0GKaUe70AjI
 *      400:
 *        description: "Bad Request"
 */
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
        data = {...data,contractor:{create:{...contractor.data,contractortag:{create:contractor.data.contractortag.map((x) => ({name:x}))}}}}
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
      res.status(400).send("No Position Specified")
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


/**
 * @openapi
 * /users/login:
 *  post:
 *    tags:
 *      - User
 *    summary: "Validates User has an account."
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: TimDog
 *              password:
 *                type: string
 *                default: password
 *    responses:
 *      200:
 *        description: "User Logged in Successfully"
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              default: eyJhbGciOiJIUzI1NiJ9.VGltRG9n.V54ePDdiH6QvCfujHabncCS5jlWG7ayH0GKaUe70AjI
 *      400:
 *        description: "Login Rejected"
 *        
 */
router.post('/login',async (req,res) => {
  const result = userLoginSchema.safeParse(req.body)
  if(!result.success)res.status(400).send("Incorrect Request Body")
  else{
    const user = await prisma.user.findUnique({where:{username:result.data.username}})
    if(!user)res.status(400).send("Username Does Not Exist")
    else if(decode(user.password) != result.data.password)res.status(400).send("Incorrect Password") //else if(decode(user.password) != result.data.password)res.status(400).send("Incorrect Password")
    else res.status(200).send(sign(user.username))
  }
})

/**
 * @openapi
 * /users/profile:
 *  get:
 *    tags:
 *      - User
 *    summary: "Gets user data for Authorized Users"
 *    parameters:
 *      - in: header
 *        name: token
 *        schema:
 *        type: string
 *        description: "Authentification Token"
 *        required: true
 *    responses:
 *      200:
 *        description: "User Successfully Found"
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/profile"
 *      400:
 *        description: "User Not Found"
 *      401:
 *        description: "Not Authorized"
 */
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
    res.status(400).send("User Does Not Exist")
  }
});


/**
 * @openapi
 * /users/type:
 *  get:
 *    tags:
 *      - User
 *    summary: Gets the user type for Authorized Users.
 *    parameters:
 *      - in: header
 *        name: token
 *        schema:
 *          type: string
 *        description: "Authentification Token"
 *        required: true
 *    responses:
 *      200:
 *        description: "User Type Successfully Found"
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                type:
 *                  type: string
 *                  default: Contractor
 *      401:
 *        description: "Not Authorized"
 *      500:
 *        description: "Authentification Error"
 */
router.get('/type',authorize(['Contractors','Companies']),(req,res) => {
  const user = res.locals.user
  if(user.contid) res.status(200).send({type:'Contractor'})
  else if(user.compid) res.status(200).send({type:'Company'})
  else res.status(500).send('Authoriziation Error')
})

module.exports = router;
