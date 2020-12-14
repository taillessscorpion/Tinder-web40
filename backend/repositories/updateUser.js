const db = require("./index");
const { User } = require("../models/User");
const { findUserByEmail } = require("./user");

const updateDisplayName = async (email, displayName) => {
    const foundUser = await db.users.findOne({ email: email });
    const toChangeUser = new User(
      foundUser.email,
      foundUser.matches,
      foundUser.followings,
      displayName,
      foundUser.birthday,
      foundUser.gender,
      foundUser.livesIn,
      foundUser.bio,
      foundUser.photos,
      foundUser.location,
      foundUser.isDeclared
    ).toJSONForSelf();
    toChangeUser.password = foundUser.password;
    toChangeUser.salt = foundUser.salt;
      await db.users.findOneAndReplace({email: email}, toChangeUser);
      const updatedUser = await findUserByEmail(email);
      return updatedUser;
  };
const updateBirthday = async (email, birthday) => {
  const foundUser = await db.users.findOne({ email: email });
    const toChangeUser = new User(
      foundUser.email,
      foundUser.matches,
      foundUser.followings,
      foundUser.displayName,
      birthday,
      foundUser.gender,
      foundUser.livesIn,
      foundUser.bio,
      foundUser.photos,
      foundUser.location,
      foundUser.isDeclared
    ).toJSONForSelf();
    
    toChangeUser.password = foundUser.password;
    toChangeUser.salt = foundUser.salt;
    await db.users.findOneAndReplace({email: email}, toChangeUser);
      const updatedUser = await findUserByEmail(email);
      return updatedUser;
};
const updateGender = async (email, gender) => {
  const foundUser = await db.users.findOne({ email: email });
    const toChangeUser = new User(
      foundUser.email,
      foundUser.matches,
      foundUser.followings,
      foundUser.displayName,
      foundUser.birthday,
      gender,
      foundUser.livesIn,
      foundUser.bio,
      foundUser.photos,
      foundUser.location,
      foundUser.isDeclared
    ).toJSONForSelf();
    toChangeUser.password = foundUser.password;
    toChangeUser.salt = foundUser.salt;
      await db.users.findOneAndReplace({email: email}, toChangeUser);
      const updatedUser = await findUserByEmail(email);
      return updatedUser;
};
const updateLivesIn = async (email, livesIn) => {
  const foundUser = await db.users.findOne({ email: email });
    const toChangeUser = new User(
      foundUser.email,
      foundUser.matches,
      foundUser.followings,
      foundUser.displayName,
      foundUser.birthday,
      foundUser.gender,
      livesIn,
      foundUser.bio,
      foundUser.photos,
      foundUser.location,
      foundUser.isDeclared
    ).toJSONForSelf();
    toChangeUser.password = foundUser.password;
    toChangeUser.salt = foundUser.salt;
      await db.users.findOneAndReplace({email: email}, toChangeUser);
      const updatedUser = await findUserByEmail(email);
      return updatedUser;
};
const updateBio = async (email, bio) => {
  const foundUser = await db.users.findOne({ email: email });
    const toChangeUser = new User(
      foundUser.email,
      foundUser.matches,
      foundUser.followings,
      foundUser.displayName,
      foundUser.birthday,
      foundUser.gender,
      foundUser.livesIn,
      bio,
      foundUser.photos,
      foundUser.location,
      foundUser.isDeclared
    ).toJSONForSelf();
    toChangeUser.password = foundUser.password;
    toChangeUser.salt = foundUser.salt;
     await db.users.findOneAndReplace({email: email}, toChangeUser);
     const updatedUser = await findUserByEmail(email);
     return updatedUser;
};
const updatePhotos = async (email, photos) => {
  const foundUser = await db.users.findOne({ email: email });
    const toChangeUser = new User(
      foundUser.email,
      foundUser.matches,
      foundUser.followings,
      foundUser.displayName,
      foundUser.birthday,
      foundUser.gender,
      foundUser.livesIn,
      foundUser.bio,
      photos,
      foundUser.location,
      foundUser.isDeclared
    ).toJSONForSelf();
    toChangeUser.password = foundUser.password;
    toChangeUser.salt = foundUser.salt;
      await db.users.findOneAndReplace({email: email}, toChangeUser);
      const updatedUser = await findUserByEmail(email);
      return updatedUser;
};
const updateLocation = async (email, location, isDeclared) => {
  const foundUser = await db.users.findOne({ email: email });
    const toChangeUser = new User(
      foundUser.email,
      foundUser.matches,
      foundUser.followings,
      foundUser.displayName,
      foundUser.birthday,
      foundUser.gender,
      foundUser.livesIn,
      foundUser.bio,
      foundUser.photos,
      location,
      isDeclared,
    ).toJSONForSelf();
    toChangeUser.password = foundUser.password;
    toChangeUser.salt = foundUser.salt;
      await db.users.findOneAndReplace({email: email}, toChangeUser);
      const updatedUser = await findUserByEmail(email);
      return updatedUser;
};
module.exports = { updateDisplayName, updateBirthday, updateGender, updateLivesIn, updateBio, updatePhotos, updateLocation};
  