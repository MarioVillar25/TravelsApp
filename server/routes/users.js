var express = require('express');
var router = express.Router();
const connection = require("../config/bd")
const userControllers = require('../controllers/userControllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//localhost:3000/users/register
router.post("/register", userControllers.register)

//localhost:3000/users/login
router.post("/login", userControllers.login)

//localhost:3000/users/getOneUser/:id
router.get("/getOneUser/:id", userControllers.getOneUser)



module.exports = router;
