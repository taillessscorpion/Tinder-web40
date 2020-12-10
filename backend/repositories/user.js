const db = require("./index");
const {User} = require("../models/user");

const findUserByEmail = async (email) => {
    const rawUser = await db.users.findOne({email: email});
    if(!rawUser) {
        return null
    }
    const user = new User(rawUser.email);
    user.password = rawUser.password;
    user.salt = rawUser.salt;
    return user;
};
const createUser = async (user) => {
    const dbResult = await db.users.insertOne({
        email: user.email,
        salt: user.salt,
        password: user.password,
    });
    const insertedRawUser = dbResult.ops[0];
    const savedUser = new User(insertedRawUser.email);
    return savedUser;
};

module.exports = {createUser, findUserByEmail};