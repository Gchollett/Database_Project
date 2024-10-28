var express = require('express');
const { PrismaClient } = require('@prisma/client');
var router = express.Router();

const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(prisma.job.findMany());
});

module.exports = router;