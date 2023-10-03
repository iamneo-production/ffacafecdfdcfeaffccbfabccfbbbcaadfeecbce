const nodeMailer = require("nodemailer");
let email="projectmailer2021@gmail.com"
let pass ="xhpyounnqjldwalp"

const transporterFunc = () => {
  return nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });
};

const sendOTP = async (email, otp, name) => {
  const transporter = await transporterFunc();
  const mailConfigOption = {
    from: `IAMNEO foodApp ${email}`,
    to: email,
    subject: "OTP verification",
    html: `
    <div>Hi ${name},</div>
    <div>${otp} is your OTP for  email verification.</div>
    <br/>
    <br/>
    <div>Thanks & Regards,</div>
    <div>IAMNEO support team</div>
    `,
  };
  return transporter.sendMail(mailConfigOption);
};

const inviteEmail = async (email,role,fullName) => {
  const transporter = await transporterFunc();
  const mailConfigOption = {
    from: `TY-Walk In's ${email}`,
    to: email,
    subject: "TY-Walk In's Confirmation mail",
    html: `
    <div>Hi ${fullName} <br/> Your account is created as ${role} in TY-Walk In's</div>
    <div>Please click the below link to login</div>
    <div><a href="http://49.249.28.218:81">TY-Walk In's</a></div>
    <br/>
    <br/>
    <div>Thanks & Regards,</div>
    <div>Technoelevate support team.</div>
    `,
  };
  return transporter.sendMail(mailConfigOption);
};

const  candidateMail= async (email,fullName,rpmdata) => {
  const transporter = await transporterFunc();
  const mailConfigOption = {
    from: `TechnoElevate ${email}`,
    to: email,
    subject: "Form for onboarding process",
    html: `
    <div>Hi ${fullName} <br/> Please click the link below to complete your the onboarding process</div>
    <div><a href="http://10.10.20.23:5002/${rpmdata}">Click here to start onboarding process </a></div>
    <br/>
    <br/>
    <div>Thanks & Regards,</div>
    <div>Technoelevate HR team.</div>
    `,
  };
  return transporter.sendMail(mailConfigOption);
};

module.exports = { sendOTP, inviteEmail ,candidateMail};
