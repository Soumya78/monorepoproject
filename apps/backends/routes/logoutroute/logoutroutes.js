const express = require('express');
const router = express.Router();
const logoutcontroller = require('/Users/soumya/Documents/my-monorepo/apps/backends/controllers/logoutcontroller.js');

router.post('/',logoutcontroller);

module.exports = router;