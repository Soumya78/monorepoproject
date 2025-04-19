require('dotenv').config();
const bcrpt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const model = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/model/users.js');
const exisitinguser = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/checkuserexists.js');
const genratetoken = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/generatetoken.js');
const hashspassword = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/hashpassword.js');
const saveusertodb = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/saveusertodb.js');
const validateregisterfield = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/validateregisterfields.js');
const loginusermiddleware = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/loginmiddleware/loginusermiddleware.js')
const sendusertoqueue = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/sendusertoqueue/sendusertoqueue.js');
router.post('/',exisitinguser,genratetoken,hashspassword,saveusertodb,sendusertoqueue,
    validateregisterfield);  
    console.log('checking');
     ///register route

    //<-------------------------------->//



module.exports = router;