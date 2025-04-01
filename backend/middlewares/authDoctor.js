import jwt from 'jsonwebtoken'

//doctor auth
const authDoctor= async (req,res,next)=>{
    try{
       const {dtoken}=req.headers
       if(!dtoken){
        return res.json({success:false,message:'not authorised login again'})
       }
       const token_decode=jwt.verify(dtoken,process.env.JWT_SECRET)
      req.body.docId=token_decode.id
       
       next()
    } catch (error){
        res.json({success:false,message:error.message})
    }
}
export default authDoctor