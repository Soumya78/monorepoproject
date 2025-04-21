const jwt = require('jsonwebtoken');

const redis = require('/Users/soumya/Documents/my-monorepo/apps/backends/client/redisclient.js');

const logoutcontroller = async function(req,res){
    try{
      const authHeader = req.headers['authorization'];
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies?.authtoken) {
      token = req.cookies.authtoken;
    }
     
      if(!token){
        return res.status(401).json({ message: "Unauthorized" });
      }
      const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
      const jiti = decoded.jiti;

      const expiresinseconds = decoded.exp - Math.floor(Date.now() / 1000);
      await redis.setex(`blackedlist:${jiti}`, expiresinseconds, token);
      res.clearCookie('authtoken');
      console.log("Logged out successfully");
      return res.status(200).json({ message: 'Logged out successfully' });
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = logoutcontroller;