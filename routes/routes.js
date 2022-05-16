const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const registerSc = require("../models/registrationModels");

router.post("/register", (request, response) => {
  // res.send("send");
  const registerUser = new registerSc({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
  });
  registerUser
    .save()
    .then((data) => {
      response.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

module.exports = router;
