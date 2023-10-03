const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { candidateMail } = require("../helper/mailHelper");
const { inviteEmail, sendOTP } = require("../helper/mailHelper");
const { createNewOTP, verifyOTP } = require("../helper/otpHelper");

let JWTSECRETKEY = "TECHNOELEVATEDEVELOPMENTTEAM";
//Registartion logic
const register = async (req, res, next) => {
  let { name, email, phoneNo, password, role } = req.body;
  try {
    const emailExits = await userModel.findOne({ email: email });

    if (emailExits) {
      res.status(400).json({
        error: true,
        message: "email already exits",
        data: null,
      });
    } else {
      const saltrounds = 10;
      //salt of the password
      const salt = await bcrypt.genSalt(saltrounds);

      //hash password
      const hashedPassword = await bcrypt.hash(password, salt);

      await userModel.insertMany([
        {
          name,
          email,
          phoneNo,
          role,
          password: hashedPassword,
        },
      ]);

      const userData = await userModel.findOne({ email: email });

      const { fullHash, otp } = createNewOTP(email);
      await sendOTP(email, otp, name);

      userData.hashedOTP = fullHash;
      await userData.save();

      res.status(200).json({
        error: false,
        message: `OTP sent to ${email}`,
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

//login Logic

const login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const userData = await userModel.findOne({ email });
    if (userData) {
      const isPasswordMatch = await bcrypt.compare(password, userData.password);

      if (isPasswordMatch) {
        let payload = { email };
        const token = await jwt.sign(payload, JWTSECRETKEY, {
          expiresIn: "20m",
        });

        res.status(200).json({
          error: false,
          message: "Login Successfully",
          token:token,
          role: userData.role,
          email:userData.email,
          name:userData.name,
          userData:userData
        });

        // const { fullHash, otp } = createNewOTP(email);
        // await sendOTP(email, otp, userData.name);

        // userData.hashedOTP = fullHash;
        // await userData.save();

        // res.status(200).json({
        //   error: false,
        //   message: `OTP sent to ${email}`,
        // });
      } else {
        res.status(401).json({
          error: true,
          message: "Invalid Password",
          data: null,
        });
      }
    } else {
      res.status(400).json({
        error: true,
        message: "User not registered",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

//send otp for forgot password logic
const forgotPasswordSendOTP = async (req, res, next) => {
  let { email } = req.body;
  try {
    const userData = await userModel.findOne({ email }).lean();
    if (userData) {
      const { fullHash, otp } = createNewOTP(email);
      await sendOTP(email, otp, userData.name);

      userData.hashedOTP = fullHash;
      await userData.save();

      res.status(200).json({
        error: false,
        message: `OTP sent to ${email}`,
      });
    } else {
      res.status(401).json({
        error: true,
        message: "User Not Registered",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

//Email verification for reset password
const verifyEmail = async (req, res, next) => {
  let { email } = req.body;

  try {
    const user = await userModel.findOne({ email }).lean();
    if (user) {
      res.status(200).json({
        error: false,
        message: `User verified with the email id: ${email}`,
      });
    } else {
      res.status(401).json({
        error: true,
        message: "User Not Registered",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

//Reset password
const resetPassword = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    const saltrounds = 10;
    //salt of the password
    const salt = await bcrypt.genSalt(saltrounds);

    //hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.findOne({ email }).lean();
    if (user) {
      await userModel.updateOne(
        { email },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
    } else {
      res.json({
        error: false,
        message: "User not found ",
      });
    }
    res.json({
      error: false,
      message: "User Password has been updated successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

//getting user by the ID
const getUserById = async (req, res, next) => {
  let { _id } = req.params;
  try {
    const user = await userModel.findOne({ _id }, { password: 0 }).lean();
    if (user) {
      res.json({
        error: false,
        message: "User found successfully",
        data: user,
      });
    } else {
      res.json({
        error: false,
        message: "User not found ",
      });
    }
  } catch (err) {
    next(err);
  }
};

//Getting all the users
const getAllUsers = async (req, res, next) => {
  try {
    const user = await userModel.find({}, { password: 0, hashedOTP: 0 }).lean();
    if (user) {
      res.json({
        error: false,
        message: "All Users found successfully",
        data: user,
      });
    } else {
      res.json({
        error: false,
        message: "User not found ",
      });
    }
  } catch (err) {
    next(err);
  }
};

//editing user profile
const editUserProfile = async (req, res, next) => {
  try {
    let { name, email, phoneNo, password } = req.body;
    let { _id } = req.params;

    const saltrounds = 10;
    //salt of the password
    const salt = await bcrypt.genSalt(saltrounds);

    //hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.findOne({ _id }).lean();
    if (user) {
      await userModel.updateOne(
        { _id },
        {
          $set: {
            name,
            email,
            phoneNo,
            password: hashedPassword,
          },
        }
      );
    } else {
      res.json({
        error: false,
        message: "User not found ",
      });
    }
    res.json({
      error: false,
      message: "User Profile has been updated successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

const candidateVerification = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const userData = await userModel.findOne({ email });
    console.log("userdata----", userData);

    if (!userData) {
      return res
        .status(502)
        .json({ error: true, message: "User is not found" });
    }
    const verified = await verifyOTP(userData.hashedOTP, otp);

    if (verified) {
      userData.verified = true;
      await userData.save();

      let payload = { email, otp };
      const token = await jwt.sign(payload, JWTSECRETKEY, {
        expiresIn: "5m",
      });

      res.status(200).json({
        error: false,
        message: "OTP Verified Successfully",
        token,
        role: userData.role,
      });
    } else {
      res.status(502).json({ error: true, message: "OTP verfication failed" });
    }
  } catch (err) {
    next(err);
  }
};

const resendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    const candidate = await Candidate.findOne({ email });
    if (!candidate) {
      return res
        .status(502)
        .json({ error: true, message: "Candidate not found" });
    }
    const { fullHash, otp } = createNewOTP(email);
    // const name = [candidate.firstName, candidate.middleName, candidate.lastName]
    //   .join(" ")
    //   .toString();
    await sendOTP(email, otp, candidate.fullName);

    candidate.hashedOTP = fullHash;
    await candidate.save();

    res.status(200).json({ error: false, message: "OTP sent successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getUserById,
  editUserProfile,
  candidateVerification,
  resendOTP,
  getAllUsers,
  forgotPasswordSendOTP,
  verifyEmail,
  resetPassword,
};
