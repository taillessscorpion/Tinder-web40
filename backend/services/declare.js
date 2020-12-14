const updateUserRepo = require('../repositories/updateUser');


const signDisplayName = async (email, displayName) => {
    const user = await updateUserRepo.updateDisplayName(email, displayName);
    return user
};
const signBirthday = async (email, birthday) => {
    const user = await updateUserRepo.updateBirthday(email, birthday);    
    return user
};
const signGender = async (email, gender) => {
    const user = await updateUserRepo.updateGender(email, gender);    
    return user
};
const signLivesIn = async (email, livesIn) => {
    const user = await updateUserRepo.updateLivesIn(email, livesIn);    
    return user
};
const signBio = async (email, bio) => {
    const user = await updateUserRepo.updateBio(email, bio);    
    return user
};
const signPhotos = async (email, photos) => {
    const user = await updateUserRepo.updatePhotos(email, photos);    
    return user
};
const atLocation = async (email, location, isDeclared) => {
    const user = await updateUserRepo.updateLocation(email, location, isDeclared);    
    return user
};

module.exports = {signDisplayName, signBirthday, signGender, signLivesIn, signBio, signPhotos, atLocation}; 