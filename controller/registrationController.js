const emailValidation = require("../helpers/emailValidation");
const nameValidation = require("../helpers/nameValidation");
const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const sendEmail = require("../helpers/sendEmail");
const otpTemplate = require("../helpers/otpTemplate");
// const numberGenerator = require("number-generator");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const { generateToken } = require("../helpers/token");

async function registrationController(req, res) {
    try {
        const { firstName, lastName, email, password, telephone, address, city, postCode, country, state, bYear, bMonth, bDay } = req.body;

        if (!nameValidation(firstName)) {
            return res.status(400).send({
                error: "First Name Is Not Valid"
            })
        }
        if (!nameValidation(lastName)) {
            return res.status(400).send({
                error: "Last Name Is Not Valid"
            })
        }

        if (!emailValidation(email)) {
            return res.status(400).send({
                error: "Please enter a valid email address"
            })
        }

        let existingMail = await User.find({ email })

        if (existingMail.length > 0) {
            return res.status(400).send({
                error: "Email Already Exists"
            })
        }

        bcrypt.hash(password, 10, async function (err, hash) {
            let userData = new User({
                firstName,
                lastName,
                email,
                password: hash,
                telephone,
                address,
                city,
                postCode,
                country,
                state,
                bYear,
                bMonth,
                bDay
            })
            userData.save()

            const token = generateToken({
                id: userData._id.toString(),
            }, "30m")

            const generator2 = aleaRNGFactory(Date.now());
            let randomOTP = generator2.uInt32().toString().substring(0, 4)
            let ranDomOTPStore = await User.findOneAndUpdate({ email }, { $set: { randomOTP: randomOTP } }, { new: true })
            sendEmail(email, ranDomOTPStore, otpTemplate)

            res.json({
                id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                token: token,
                bYear: userData.bYear,
                bMonth: userData.bMonth,
                bDay: userData.bDay,
                success: "Registration Successfull",
            })
        });

    } catch (error) {
        res.send(error.message)
    }
}

module.exports = registrationController;

