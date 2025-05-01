import User from "../config/model/users";

const fetchupiid = async function():Promise<string[]>  {
  const upidis = await User.find({ upiid:{$exists:true,$ne:null} });
  return upidis.map((user) => user.upiid);
}
export default fetchupiid;