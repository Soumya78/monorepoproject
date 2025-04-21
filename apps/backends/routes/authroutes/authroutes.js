require('dotenv').config();
const bcrpt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const model = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.js');
const exisitinguser = require('../../config/middleware/registermiddleware/checkuserexists.js');
const genratetoken = require('../../config/middleware/registermiddleware/generatetoken.js');
const hashspassword = require('../../config/middleware/registermiddleware/hashpassword.js');
const saveusertodb = require('../../config/middleware/registermiddleware/saveusertodb.js');
const validateregisterfield = require('../../config/middleware/registermiddleware/validateregisterfields.js');
const loginusermiddleware = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/loginmiddleware/loginusermiddleware.js')
const sendusertoqueue = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/sendusertoqueue/sendusertoqueue.js');
router.post('/',exisitinguser,genratetoken,hashspassword,saveusertodb,sendusertoqueue,
    validateregisterfield);  
    console.log('checking');
     ///register route

    //<-------------------------------->//



module.exports = router;