const User = require("../models/userModel.js");

async function matchOTP(req, res) {
    const { randomOTP, email } = req.body;

    console.log(randomOTP);

    const existingMail = await User.find({ email })

    if (existingMail[0].randomOTP === randomOTP) {
        const removeOTP = await User.findOneAndUpdate({ email }, { $unset: { "randomOTP": "" } }, { new: true })
        return res.send({
            message: "OTP Matched"
        })
    } else {
        return res.send({
            message: "OTP Not Matched"
        })
    }
}

module.exports = matchOTP;