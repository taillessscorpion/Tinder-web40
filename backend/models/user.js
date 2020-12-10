const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const SECRET_JWT_KEY = "my_secret_jwt_key";

class User {
    email;
    password;
    salt;
    constructor(email) {
        this.email = email;
    }
    generatePassword(password) {
        this.salt = crypto.randomBytes(128).toString("base64");
        this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
    }
    verifyPassword(password) {
        const hashedPassword = crypto.pbkdf2Sync(password, this.salt, 10000, 512, "sha512").toString("hex");
        return this.password === hashedPassword;
    }
    generateJSONWebToken() {
        return jwt.sign({email: this.email}, SECRET_JWT_KEY, {
            expiresIn: 6000,
        })
    }
    toJSON() {
        return {
            email: this.email
        }
    }
};

module.exports = {User};