import bcrypt from "bcryptjs";
// HASHING PASSWORD
export const hashedPassword = async (password)=>{
    try {
           const saltRound = 10;
            return await bcrypt.hash(password,saltRound)
    } catch (error) {
        console.log(error)
    }
}
// COMPARE PASSWORD
export const comparePassword = async(password,hashPass)=>{
      try {
             return await bcrypt.compare(password,hashPass)
      } catch (error) {
        console.log(error)
      }
}