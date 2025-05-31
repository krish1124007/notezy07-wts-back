import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const UserSchem = new mongoose.Schema( {
    emailId: {
        type: String,
        requiredL: true,
        uniqe:true
    },
    profile: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false,
        default: "hey wts"

    },
    username: {
        type: String,
        required: false
    }
})


UserSchem.methods.generateAccessToken = function(expiresIn = '7d') {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign({_id:this._id}, secret, { expiresIn });
  return token;
}


export  const User = mongoose.model("User" , UserSchem)