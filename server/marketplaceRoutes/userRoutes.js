const express = require('express');
const {  authorizeRoles } = require('../middleware/auth');
const {  registerUser, registerAnonymousUser, loginAnonymousUser, loginUser,  } = require('../marketplaceController/UserController');

const router = express.Router();
router.route("/register").post(registerUser)
router.route("/login/:marketplaceId").post(loginUser)

router.route("/register-anonymous").post(registerAnonymousUser)
router.route("/login-anonymous/:marketplaceId").post(loginAnonymousUser)

module.exports=router;