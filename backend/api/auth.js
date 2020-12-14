const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const AuthService = require("../services/auth");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { jwt, user } = await AuthService.signup(email, password);
    res.json({
      jwt: jwt,
      user: user.toJSONForSelf(),
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { jwt, user } = await AuthService.login(email, password);
    res.json({
      jwt: jwt,
      user: user.toJSONForSelf(),
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
});
router.post("/permission", authMiddleware, (req, res) => {
  if(req.user) {
    res.json({
      jwt: req.jwt,
      user: req.user.toJSONForSelf(),
    })
  } else {
    res.status(401).send("err")
  }
})
module.exports = router;