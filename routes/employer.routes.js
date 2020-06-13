const express = require('express');
const router = express.Router();


const employerService = require('../services/employer.service');


router.use(express.json());



module.exports =  router;