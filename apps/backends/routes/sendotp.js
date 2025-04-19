const express= require('express');
const router = express.Router();    
const app= express();
const { handleotpgeneration } = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/otpmiddleware/otpmiddleware.js');

router.post('/',handleotpgeneration,async function (req, res){
    console.log(`OTP for ${req.body.phone}: ${req.otp}`);

  res.status(200).json({ message: 'OTP sent successfully' });
}) 
module.exports = router;