import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability=async(req,res)=>{
    try{
       const {docId}=req.body
       const docData=await doctorModel.findById(docId)
       await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
       res.json({success:true,message:"availability changed"})
    } catch (error){
        res.json({success:false,message:error.message})
    }
}

const doctorList=async (req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select(['-email','-password'])
        res.json({success:true,doctors})
    } catch (error){
        res.json({success:false,message:error.message})
    }
}
//api for doctor login
const loginDoctor=async(req,res)=>{
    try {
        const {email,password}=req.body
        const doctor=await doctorModel.findOne({email})
        if(!doctor){
            return res.json({success:true,message:'invalid credentials'})
        }
        const isMatch=await bcrypt.compare(password,doctor.password)
        if(isMatch){
             const token=jwt.sign({id:doctor._id},process.env.JWT_SECRET)
             res.json({success:true,token})
        } else {
            res.json({success:true,message:'invalid credentials'})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//api to get doctor appointment for doctor pannel(each doctor's specific appointment)
const appointmentsDoctor=async(req,res)=>{
    try {
        const {docId}=req.body
        const appointments=await appointmentModel.find({docId})
        res.json({success:true,appointments})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
//api to mark appointment complted for doctor pannel
const appointmentComplete=async(req,res)=>{
    try {
        const {docId,appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,message:"appointment completed"})
        } else{
            res.json({success:false,message:"mark failed"})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
//api to cancel appointment  for doctor pannel
const appointmentCancel=async(req,res)=>{
    try {
        const {docId,appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)
        if(appointmentData && appointmentData.docId===docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{isCancelled:true})
            return res.json({success:true,message:"appointment cancelled"})
        } else{
            res.json({success:false,message:"cancellation failed"})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//api to get dashboard data for doctor
const doctorDashboard=async(req,res)=>{
    try {
        const {docId}=req.body
        const appointments=await appointmentModel.find({docId})
        let earnings=0
        appointments.map((item)=>{
            if(item.isCompleted ){  //payment change
                earnings+=item.amount
            }
        })
        let patients=[]
        appointments.map((item)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })
        const dashData={
            earnings,appointments:appointments.length,patients:patients.length,latestAppointments:appointments.reverse().slice(0,5)
            
        }
        res.json({success:true,dashData})

    } catch (error) {
        res.json({success:false,message:error.message}) 
    }
}
//api to get doctor profile for doctor pannel
const doctorProfile=async(req,res)=>{
    try {
        const {docId}=req.body
        const profileData=await doctorModel.findById(docId).select('-password')
        res.json({success:true,profileData})
    } catch (error) {
        res.json({success:false,message:error.message}) 
    }
}

//api to ipdate doctor profile data from doctor pannel
const updateDoctorProfile=async(req,res)=>{
    try {
        const {docId,fees,address,available}=req.body
        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
        res.json({success:true,message:'profile updated'})
    } catch (error) {
        res.json({success:false,message:error.message}) 
    }
}

export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor
    ,appointmentCancel,appointmentComplete,doctorDashboard,doctorProfile,updateDoctorProfile}