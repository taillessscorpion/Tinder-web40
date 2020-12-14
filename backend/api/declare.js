const express = require("express");
const router = express.Router();
const DeclareService = require("../services/declare");

router.post("/display-name", async (req, res) => {
    const {email, displayName} = req.body;
    try {
        const user = await DeclareService.signDisplayName(email, displayName)
        res.json(user.toJSONForSelf());
    } catch(err) {
        res.status(402).send(err.message);
    }
})
router.post("/birthday", async (req, res) => {
    const {email, birthday} = req.body;
    try {
        const user = await DeclareService.signBirthday(email, birthday)
        res.json(user.toJSONForSelf());
    } catch(err) {
        res.status(402).send(err.message);
    }
})
router.post("/gender", async (req, res) => {
    const {email, gender} = req.body;
    try {
        const user = await DeclareService.signGender(email, gender)
        res.json(user.toJSONForSelf());
    } catch(err) {
        res.status(402).send(err.message);
    }
})
router.post("/lives-in", async (req, res) => {
    const {email, livesIn} = req.body;
    try {
        const user = await DeclareService.signLivesIn(email, livesIn)
        res.json(user.toJSONForSelf());
    } catch(err) {
        res.status(402).send(err.message);
    }
})
router.post("/bio", async (req, res) => {
    const {email, bio} = req.body;
    try {
        const user = await DeclareService.signBio(email, bio)
        res.json(user.toJSONForSelf());
    } catch(err) {
        res.status(402).send(err.message);
    }
})
router.post("/photos", async (req, res) => {
    const {email, photos} = req.body;
    try {
        const user = await DeclareService.signPhotos(email, photos)
        res.json(user.toJSONForSelf());
    } catch(err) {
        res.status(402).send(err.message);
    }
})
router.post("/location", async (req, res) => {
    const {email, location, isDeclared} = req.body;
    try {
        // const user = await DeclareService.atLocation(email, location, isDeclared)
        // res.json(user.toJSONForSelf());
        res.json({})
    } catch(err) {
        res.status(402).send(err.message);
    }
})
module.exports = router;