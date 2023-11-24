const nodemailer = require("nodemailer");

async function sendEmail(email, verify, template) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'esmern2203@gmail.com',
            pass: 'cdtudivxwqyzidrd'
        }
    });

    const info = await transporter.sendMail({
        from: 'esmern2203@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Verification OTP", // Subject line
        html: template(verify), // html body
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;