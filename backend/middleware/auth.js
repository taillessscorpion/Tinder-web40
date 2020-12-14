const JSONWebToken = require("jsonwebtoken");
const AuthService = require("../services/auth");


const authMiddleware = (req, res, next) => {
    const bearerJwt = req.headers.authorization;
  if(!bearerJwt) {
    res.status(401).send("You did not log in");
    return
  }
  JSONWebToken.verify(bearerJwt.split(" ")[1], process.env.JWT_SECRET, async (err, data) => {
      if(err) {
        res.status(401).send("You are out of state, try to re-log in");
      } else {
        const {jwt, user} = await AuthService.persistIn(data.email);
        if(!user) {
            res.status(401).send("User not found"); 
        } else {
            req.user = user;
            req.jwt = jwt;
            next();
        }
      }
  })
}
module.exports = authMiddleware;