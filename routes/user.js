const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/saveRedirectUrl.js");
const { getSignupPage, registerUser, getLoginPage, loginUser, logout } = require("../controllers/userControllers.js");


router.route("/signup")
.get(getSignupPage)
.post(wrapAsync(registerUser));

router.route("/login")
.get(getLoginPage)
.post(saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
    wrapAsync(loginUser));

router.route("/logout")
.get(logout);

module.exports=router;