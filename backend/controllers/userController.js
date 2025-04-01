import bcrypt from 'bcryptjs'
import validator from 'validator'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import { sendMail } from '../helpers/SendMail.js'

dotenv.config()

//api to register user
const registerUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name || !password || !email){
            return res.json({success:false,message:'missing details'})
        } if(!validator){
            return res.json({success:false,message:'enter a valid email'})
        } if(password.length<8){
            return res.json({success:false,message:'enter a strong password'})
        }
        //hashing
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const userData={
            name,email,password:hashedPassword
        }
        const newUser=new userModel(userData)
        const user=await newUser.save()
        sendMail(email,"welcome to quicmed",'hi',`${name} thank for registering`)
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})

        //
    } catch (error){
         res.json({success:false,message:error.message})
    }
}

//api for user login
const loginUser=async(req,res)=>{
    try{
    const {email,password}=req.body
    const user=await userModel.findOne({email})
    if(!user){
      return  res.json({success:false,message:'user does not exist'})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(isMatch){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})
    } else {
        res.json({success:false,message:'invalid credentials'})
    }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}
//api to get userprofile data
const getProfile=async (req,res)=>{
  try{
    const {userId}=req.body
    const userData=await userModel.findById(userId).select('-password')
    res.json({success:true,userData})
  } catch (error){
    res.json({success:false,message:error.message})
  }
}

//api to update user profile
const updateProfile=async(req,res)=>{
    try{
     const {userId,name,phone,address,dob,gender}=req.body
     const imageFile=req.file
     if(!name || !phone || !dob || !gender){
       return res.json({success:false,message:'data missing'})
     }
     await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
     if(imageFile){
        //upload image to cloudinary
         const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
         const imageURL=imageUpload.secure_url
         await userModel.findByIdAndUpdate(userId,{image:imageURL})
     }
     res.json({success:true,message:'profile updated'})
    } catch (error){
        res.json({success:false,message:error.message})
    }
}
//api to book appontment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' });
        }
        let slots_booked = docData.slots_booked;

        // Checking for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' });
            } else {
                slots_booked[slotDate].push(slotTime); // 2D array used
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        };
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Save new slot data in doctor data
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        // Send email to the doctor
        const doctorEmail = docData.email; // Assuming `email` is a field in the doctor model
        const subject = 'New Appointment Booked';
        const text = `Dear Dr. ${docData.name},\n\nYou have a new appointment booked.\n\nDetails:\n- Patient Name: ${userData.name}\n- Date: ${slotDate}\n- Time: ${slotTime}\n\nThank you,\nPrescripto Team`;
        const html = `
            <p>Dear Dr. ${docData.name},</p>
            <p>You have a new appointment booked.</p>
            <p><strong>Details:</strong></p>
            <ul>
                <li><strong>Patient Name:</strong> ${userData.name}</li>
                <li><strong>Date:</strong> ${slotDate}</li>
                <li><strong>Time:</strong> ${slotTime}</li>
            </ul>
            <p>Thank you,<br>Quickmed Team</p>
        `;

         sendMail(doctorEmail, subject, text, html);

        res.json({ success: true, message: 'Appointment booked and email sent to the doctor' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//api to get userappointment
const listAppointment=async(req,res)=>{
  try{
     const {userId}=req.body
     const appointments=await appointmentModel.find({userId})

     res.json({success:true,appointments})
  } catch (error){
    res.json({success:false,message:error.message})
  }
}
//api to cancel appointment
const cancelAppointment=async(req,res)=>{
    try{
       const {userId,appointmentId}=req.body
       const appointmentData=await appointmentModel.findById(appointmentId)
       //vrify appointment user
       if(appointmentData.userId !== userId){
        return res.json({success:false,message:'unauthorised action'})
       } 
       await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

       //releasing doctors slot
       const {docId,slotDate,slotTime}=appointmentData
       const doctorData=await doctorModel.findById(docId)
       let slots_booked=doctorData.slots_booked
       slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)
       await doctorModel.findByIdAndUpdate(docId,{slots_booked})
       res.json({success:true,message:'appointment cancelled'})
    } catch (error){
       res.json({success:false,message:error.message})
    }
}
//api to make payment of appointment using razor pay




export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment}