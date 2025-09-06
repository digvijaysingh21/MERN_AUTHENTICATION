// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({

//     host:"smtp-relay.brevo.com",
//     port: 587,
//     auth:{
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSOWRD,
//     }

// });

// export default transporter;

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.MAILJET_API_KEY,
    pass: process.env.MAILJET_SECRET_KEY,
  },
});

export default transporter;
