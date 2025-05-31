import { User } from "../../models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js"
import { generateOtp } from "../../utils/generateOtp.js"
import { sendMail } from "../../utils/sendMail.js"
import { OTP } from "../../models/otp.model.js"

const signup = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400)
      .json(
        new apiResponse(401, "please enter your mail", { success: false, data: "please enter your mail" })
      )
  }

  const isUserExist = await User.findOne({ emailId: email });

  const otp = generateOtp();

  if (!otp) {
    return res.status(500)
      .json(
        new apiResponse(501, "server error occure", { success: false, data: "server error occure" })
      )
  }

  if (!isUserExist) {
    const newuser = await User.create({ emailId: email })

    if (!newuser) {
      return res.status(500)
        .json(
          new apiResponse(501, "server error", { success: false, data: "server error" })
        )
    }

  }

  await sendMail({
    to: email, // ensure this is the recipient email
    subject: "Your Notezy-WTS OTP Code",
    html: `
    <!DOCTYPE html>
    <html lang="en" style="margin: 0; padding: 0; background-color: #f4f4f4;">
      <head>
        <meta charset="UTF-8" />
        <title>Notezy-WTS OTP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
        <table width="100%" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #4facfe; padding: 20px 30px; color: white; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Notezy-WTS</h1>
              <p style="margin: 5px 0 0;">Your Note, Your World</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h2 style="color: #333;">Hello 👋,</h2>
              <p style="font-size: 16px; color: #555;">
                We received a request to log in or register with your email. Use the following OTP to continue. This OTP is valid for <strong>5 minutes</strong>.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <div style="display: inline-block; padding: 15px 30px; background-color: #4facfe; color: white; font-size: 24px; font-weight: bold; border-radius: 8px;">
                  ${otp}
                </div>
              </div>

              <p style="font-size: 14px; color: #999;">
                If you did not request this, please ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #aaa;">
              &copy; 2025 Notezy-WTS. All rights reserved.<br />
              Made with ❤️ by your Notezy team.
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
  });

  const save_otp = await OTP.create({
    emailId: email, otp: otp
  })
  
  if(!save_otp)
  {
    return res.status(400)
    .json(
      new apiResponse(401,"please enter correct gamil id",{success:false , data:"please enter correct email id"})
    )
  }
  return res.status(200)
    .json(
      new apiResponse(201, "opt send succesfully", { success: true, data: "opt send successfully" })
    )
})

const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400)
      .json(
        new apiResponse(401, "please Enter email and otp", { success: false, data: "please enter email and otp both" })
      )
  }

  const isOtpExist = await OTP.findOne({emailId:email , otp:otp})
  if(!isOtpExist)
  {
    return res.status(400)
    .json(
      new apiResponse(401 , "please enter correct otp" , {success:false , data:"please enter correct otp"})
    )
  }

  const findUser = await User.findOne({emailId:email});
  if(!findUser)
  {
    return res.status(400)
    .json(
      new apiResponse(401,"Can't find user" , {success:false , data:"can't find the user"})
    )
  }

  const access_token  = await findUser.generateAccessToken();
  if(!access_token)
  {
    return res.status(500,"can't generate accesstoken please try again" , {success:false , data:"please try again"})
  }

  await isOtpExist.deleteOne()

  return res.status(200)
  .json(
    new apiResponse(201 , "OTP is verify" ,{success:true , data:access_token})
  )


})


export { 
  signup,
  verifyOTP

}
