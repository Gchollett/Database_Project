var express = require('express');
const { PrismaClient } = require('@prisma/client');
// const 
var router = express.Router();

const prisma = new PrismaClient();

/**
 * @openapi
 * /tags:
 *  get:
 *      tags:
 *          - Tags
 *      summary: "Gets all tags"
 *      responses:
 *          200:
 *              description: "Succressfuly retrieved all tags"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      default: "Software"
 */
router.get('/',async (req,res) => {
    res.status(200).send(await prisma.tag.findMany())
})

module.exports = router