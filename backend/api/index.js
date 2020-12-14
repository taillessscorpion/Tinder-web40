const express = require('express');
const authRouter = require("./auth");
const declareRouter = require("./declare");
const uploadRouter = require("./upload");

const router = express.Router();
router.use('/auth', authRouter);
router.use("/auth/declare", declareRouter);
router.use("/upload", uploadRouter);

module.exports = router;