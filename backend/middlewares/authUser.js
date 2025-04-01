import jwt from 'jsonwebtoken'

//admin auth
const authUser= async (req,res,next)=>{
    try{
       const {token}=req.headers
       if(!token){
        return res.json({success:false,message:'not authorised login again'})
       }
       const token_decode=jwt.verify(token,process.env.JWT_SECRET)
      req.body.userId=token_decode.id
       
       next()
    } catch (error){
        res.json({success:false,message:error.message})
    }
}
export default authUser