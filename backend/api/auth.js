const express = require("express");
const router = express.Router();
const AuthService = require("../services/auth");

router.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await AuthService.signup(email, password);
        res.json(user.toJSON());
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});
router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try{
        const {jwt, user} = await AuthService.login(email, password);
        res.json({
            jwt: jwt,
            user: user.toJSON(),
        });
    } catch(err) {
        res.status(401).send(err.message);
    }
});
// router.post('/confirmation', userController.confirmationPost);
// router.post('/resend', userController.resendTokenPost);
module.exports = router;