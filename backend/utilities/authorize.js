const {parse} = require('./token.js')
const {RequestHandler} = require('express')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const authorize = (allowedUsers) => {
    const middleware = async (req,res,next) => {
        const header = req.header('Authorization');
        if(!header){
            res.status("401").send("Not Authorized")
            return;
        }
        const [_,token] = header.split(' ');
        const username = parse(token)
        if(username == ""){
            res.status(401).send("Not Authorized")
            return;
        }
        var user = null;
        if(allowedUsers.includes("Contractors")){
            user = await prisma.contractor.findFirst({where:{username:username}})
        }
        if(allowedUsers.includes("Companies") && !user){
            user = await prisma.company.findFirst({where:{username:username}})
        }
        if(!user){
            res.status(401).send("Not Authorized")
            return;
        }
        res.locals.user = user;
        next()
    }
    return middleware
}

module.exports = authorize