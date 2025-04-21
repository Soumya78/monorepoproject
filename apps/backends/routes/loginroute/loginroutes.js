const express = require('express');
const app = express();
const router = express.Router();
const loginusermiddleware = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/loginmiddleware/loginusermiddleware.js')
router.post('/',loginusermiddleware);

module.exports = router;