const {parse} = require('./token.js')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

const authorize = (allowedUsers) => {
    const middleware = async (req,res,next) => {
        const header = req.header('Authorization');
        if(!header){
            res.status(401).send("Not Authorized")
            console.log('No header')
            return;
        }
        const [_,token] = header.split(' ');
        const username = parse(token)
        if(username == ""){
            res.status(401).send("Not Authorized")
            console.log("improper username")
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
            console.log("no user in system")
            res.status(401).send("Not Authorized")
            return;
        }
        res.locals.user = user;
        next()
    }
    return middleware
}

module.exports = authorize