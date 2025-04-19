const saveusertodb = require("/Users/soumya/Documents/my-monorepo/apps/backends/config/middleware/saveusertodb.js");
const {getchannel} = require("/Users/soumya/Documents/my-monorepo/apps/backends/services/notifcationservice/notificationservice.js");

const sendusertoqueue = async function (req, res, next) {
    console.log("Middleware: sendusertoqueue")
    const user = req.saveusertodb;
    console.log("User to be sent to queue:", user);

    if(!user || !user.emailid){
       console.warn("User not found in request");
        return next();
    }
    const channel = getchannel();
    console.log(channel);
    if(!channel){
        console.warn("Channel not found");
        return next();
    }
    const message = JSON.stringify({emailid:user.emailid});
    channel.sendToQueue("registrationqueue", Buffer.from(message), { persistent: true });
    console.log("User sent to queue:", message);
    next();
   
}
module.exports = sendusertoqueue;

