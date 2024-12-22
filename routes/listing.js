const express=require('express');
const router=express.Router();
const multer=require("multer");

require("dotenv").config();
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


//make it a middleware
const validateListing=require("../utils/validateListing.js"); //
const validateReview=require("../utils/validateReview.js"); //
const wrapAsync=require("../utils/wrapAsync.js");

//use {} for avoiding "callback required but got a [object]" error
const {saveRedirectUrl} = require('../utils/saveRedirectUrl.js');
const {isLogined} = require('../utils/saveRedirectUrl.js');
const { indexPage, addPage, getListing, destroyListing, addListing, destroyReview, createReview } = require('../controllers/listingControllers.js');


//use isauthenticated as a middleware
router.route("/")
.get(indexPage)
.post(isLogined, upload.single("image"), wrapAsync(addListing));

//isAuthenticated as a middleware
router.route("/add")
.get(isLogined, addPage);

//checking objectId validity as a middleware -- remaining
//mongoose post middleware -- implemented
//fix the vulnarability (server side validity check for authorization before deleting) -- implemented
router.route("/:id")
.get(wrapAsync(getListing))
.delete(isLogined,destroyListing);

//check the user authorization before deleting any review
router.delete("/:id/reviews/:reviewId", wrapAsync(destroyReview));

router.post("/:id/reviews",isLogined, validateReview, wrapAsync(createReview));

module.exports=router;