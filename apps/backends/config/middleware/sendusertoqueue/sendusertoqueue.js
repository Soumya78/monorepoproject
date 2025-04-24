const saveusertodb = require("../registermiddleware/saveusertodb.js");
const {getchannel} = require("/Users/soumya/Documents/my-monorepo/apps/backends/services/notifcationservice/notificationservice.js");

const sendusertoqueue = async function (req, res, next) {
 
    const user = req.saveusertodb;
  

    if(!user || !user.emailid){
       console.warn("User not found in request");
        return next();
    }
    const channel = getchannel();
  
    if(!channel){
        console.warn("Channel not found");
        return next();
    }
    const message = JSON.stringify({emailid:user.emailid});
    channel.sendToQueue("registrationqueue", Buffer.from(message), { persistent: true });
    
    next();
   
}
module.exports = sendusertoqueue;

