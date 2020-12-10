const userRepo = require('../repositories/user');
const {User} = require("../models/user");
const {validateEmail} = require('./validateEmail');
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");


const signup = async (email, password) => {
    const validateResult = validateEmail(email);
    if(!validateResult) {
        throw new Error('The entered email is invalid!')
    }
    const user = await userRepo.findUserByEmail(email);
    if(user) {
        throw new Error("The entered email is already associated with another account");
    }
    const newUser = new User(email);
    newUser.generatePassword(password);
    const savedUser = await userRepo.createUser(newUser);
    return savedUser;
};
const login = async (email, password) => {
    const validateResult = validateEmail(email);
    if(!validateResult) {
        throw new Error('The entered email is invalid!')
    }
    const user = await userRepo.findUserByEmail(email);
    if(!user) {
        throw new Error("Email is not existed")
    }
    if(!user.verifyPassword(password)) {
        throw new Error("Password is not correct");
    }
    const jwt = user.generateJSONWebToken();
    return {jwt, user}
}

/// WILL BE FINISHED AFTER DECEMBER THE TENTH NIGHT
// const sendEmail = async (user, host) => {
//     const jwt = user.generateJSONWebToken();
//     const options = {auth: {api_user: user.email}};
//     const client = nodemailer.createTransport(sgTransport(options));
//     const emailMessage = {
//         from: 'No-reply@appweb.Tinder',
//         to: user.email,
//         subject: 'Account Verification Token',
//         text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/confirmation\/' + jwt + '.\n' 
//     }
//     client.sendMail(emailMessage, err => {
//         console.log(err.message);
//     })
// }

module.exports = {signup, login}; 