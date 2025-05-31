import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    emailId:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    }
})


export const OTP = mongoose.model("OTP" , OTPSchema)