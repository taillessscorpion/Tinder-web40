const db = require("./index");
const { SignedUser } = require("../models/SignedUser");
const { User } = require("../models/User");


const createUser = async (rawUser) => {
  const dbResult = await db.users.insertOne({
    email: rawUser.email,
    displayName: "",
    matches: [],
    followings: [],
    birthday: "",
    gender: "",
    livesIn: "",
    bio: "",
    photos: "",
    location: "",
    isDeclared: false,
    password: rawUser.password,
    salt: rawUser.salt,
  });
  const insertedRawUser = dbResult.ops[0];
  const user = new SignedUser(insertedRawUser.email);
  return user;
};
const findUserByEmail = async (email) => {
  const rawUser = await db.users.findOne({ email: email });
  
  if (!rawUser) {
    return null;
  }
    const user = new User(
      rawUser.email,
      rawUser.matches,
      rawUser.followings,
      rawUser.displayName,
      rawUser.birthday,
      rawUser.gender,
      rawUser.livesIn,
      rawUser.bio,
      rawUser.photos,
      rawUser.location,
      rawUser.isDeclared
    );
    user.password = rawUser.password;
    user.salt = rawUser.salt;
    return user;
};
module.exports = { createUser, findUserByEmail};
