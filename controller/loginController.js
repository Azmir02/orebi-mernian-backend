const emailValidation = require("../helpers/emailValidation");
const User = require("../models/userModel.js");
const bcrypt = require('bcrypt');

async function loginController(req, res) {
    const { email, password } = req.body;


    if (!emailValidation(email)) {
        return res.status(400).json({
            message: "Please enter a valid email address"
        })
    }

    let existingEmail = await User.find({ email })


    if (existingEmail.length > 0) {
        bcrypt.compare(password, existingEmail[0].password, function (err, result) {
            if (result) {
                return res.json({
                    Success: "Login Successfully",
                    firstName: existingEmail[0].firstName,
                    lastName: existingEmail[0].lastName,
                    email: existingEmail[0].email,
                    id: existingEmail[0]._id,
                })
            } else {
                return res.status(400).send({
                    error: "Password Not Matched"
                })
            }
        });
    } else {
        return res.status(400).json({
            message: "Email Not Matched"
        })
    }


}

module.exports = loginController;   