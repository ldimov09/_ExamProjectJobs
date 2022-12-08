const jobController = require("../controllers/jobController");
const authController = require("../controllers/authController");
const express = require("express");
let cors = require('cors');

module.exports = function (app) {
    app.use(cors()); 
    app.use(express.json());
    app.use("/api/", jobController);
    app.use('/api/auth/', authController);
}