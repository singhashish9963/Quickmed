import jwt from 'jsonwebtoken'

//admin auth
const authAdmin= async (req,res,next)=>{
    try{
       const {atoken}=req.headers
       if(!atoken){
        return res.json({success:false,message:'not authorised login again'})
       }
       const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)
       if(token_decode!== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
        return res.json({success:false,message:'not authorised verify again'})
       }
       next()
    } catch (error){
        res.json({success:false,message:error.message})
    }
}
export default authAdmin