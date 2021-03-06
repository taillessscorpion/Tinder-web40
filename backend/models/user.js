const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class User {
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
    constructor(email, matches,
        followings,
        displayName,
        birthday,
        gender,
        livesIn,
        bio,
        photos,
        location,
        isDeclared) {
        this.email = email;
        this.matches = matches;
        this.followings = followings;
        this.displayName = displayName;
        this.birthday = birthday;
        this.gender = gender;
        this.livesIn = livesIn;
        this.bio = bio;
        this.photos = photos;
        this.location = location;
        this.isDeclared = isDeclared;
    }
    calculateAge(birthday) {
        return age = new Date().getFullYear() - parseInt(birthday);
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
            matches: this.matches,
            followings: this.followings,
            displayName: this.displayName,
            birthday: this.birthday,
            gender: this.gender,
            livesIn: this.livesIn,
            bio: this.bio,
            photos: this.photos,
            location: this.location,
            isDeclared: this.isDeclared
        }
    }
    toJSONForSwipe() {
        return {
            email: this.email,
            age: this.age,
            displayName: this.displayName,
            gender: this.gender,
            livesIn: this.livesIn,
            bio: this.bio,
            photos: this.photos,
            location: this.location
        }
    }
};

module.exports = {User};