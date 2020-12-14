const UserRepo = require('../repositories/user');
const {validateEmail} = require('./validateEmail');
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const { SignedUser } = require('../models/SignedUser');


const signup = async (email, password) => {
    const validateResult = validateEmail(email);
    if(!validateResult) {
        throw new Error('The entered email is invalid!')
    }
    const requiredUser = await UserRepo.findUserByEmail(email);
    if(requiredUser) {
        throw new Error("The entered email is already associated with another account");
    }
    const newUser = new SignedUser(email);
    newUser.generatePassword(password);
    const user = await UserRepo.createUser(newUser);
    const jwt = user.generateJSONWebToken();
    return {jwt, user};
};
const login = async (email, password) => {
    const validateResult = validateEmail(email);
    if(!validateResult) {
        throw new Error('The entered email is invalid!')
    }
    const user = await UserRepo.findUserByEmail(email);
    if(!user) {
        throw new Error("Email is not existed")
    }
    if(!user.verifyPassword(password)) {
        throw new Error("Password is not correct");
    }
    const jwt = user.generateJSONWebToken();
    return {jwt, user}
}
const persistIn = async (email) => {
    const user = await UserRepo.findUserByEmail(email);
    if(user) {
        const jwt = user.generateJSONWebToken();
        return {jwt, user}
    }
    return null
}
module.exports = {signup, login, persistIn}; 