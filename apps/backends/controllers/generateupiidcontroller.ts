import User from "../config/model/users";
const genereateupiid = async function (base:String):  Promise<String> {
   
    const suffix = "@ybl";
    let baseupi = base.includes('@') ? base.split('@')[0].toLowerCase() : base.toLowerCase();
    let upiid = `${baseupi}${suffix}`;

    while(await User.exists({upiid})){
        upiid = `${baseupi}${suffix}`;
    }
    return upiid;

} 
export default genereateupiid;