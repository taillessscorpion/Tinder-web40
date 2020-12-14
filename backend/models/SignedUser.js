const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class SignedUser {
    email;
    matches;
    followings;
    displayName;
    birthday;
    gender;
    livesIn;
    bio;
    photos;
    location;
    isDeclared;
    password;
    salt;
    constructor(email) {
        this.email = email;
        this.matches = [];
        this.followings = [];
        this.displayName = '';
        this.birthday = '';
        this.gender = '';
        this.livesIn = '';
        this.bio = '';
        this.photos = "";
        this.location = '';
        this.isDeclared = false;
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
        return jwt.sign({email: this.email}, process.env.JWT_SECRET, {
            expiresIn: 38400,
        })
    }
    toJSONForSelf() {
        return {
            email: this.email,
            displayName: this.displayName,
            matches: this.matches,
            followings: this.followings,
            birthday: this.birthday,
            gender: this.gender,
            livesIn: this.livesIn,
            bio: this.bio,
            photos: this.photos,
            location: this.location,
            isDeclared: this.isDeclared,
        }
    }
};

module.exports = {SignedUser};