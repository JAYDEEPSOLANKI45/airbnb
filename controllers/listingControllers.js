const Review = require("../models/review");
const checkObjectIdValidity = require("../utils/checkObjectIdValidity");
const Listing=require('../models/listing.js');
const ExpressError=require("../utils/ExpressError");

module.exports.indexPage=async (req,res)=>{
    let listings=await Listing.find({});
    res.render("index.ejs",{listings});
};

module.exports.addPage=(req,res)=>{
    res.render("add.ejs");
};

module.exports.getListing=async (req,res,next)=>{
    let {id}= req.params;
    if(!checkObjectIdValidity(id)){
        req.flash("error","You have provided invalid Id format.");
        return next(new ExpressError(400,"Bad request: Invalid Id format"));
    }
    
    //could just user populate("reviews") function to do this instead of manually doint it
    let listing = await Listing.findById(id).populate({path:"reviews",populate:"author"}).populate("owner");
    if(!listing)
    {
        req.flash("error","Listing does not exist");
        //return ensures that multiple headers are not sent
        return res.redirect("/listings");
    }
    res.render("listing.ejs", {listing});
};

module.exports.destroyListing=async (req,res,next)=>{
    try{
        let {id}= req.params;
    if(!checkObjectIdValidity(id))
        return next(new ExpressError(400,"You have provided invalid Id format."));

    //create a middleware for isOwner()
    let listing=await Listing.findById(id);
    if(!listing)
        return next(new ExpressError(404,"Listing does not exist"));

    //make it a middleware -- remaining
    if(!res.locals.currentUser._id.equals(listing.owner._id))
    {
        req.flash("error","You don't have required permissions to perform this action");
        return res.redirect("/listings");
    }
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully!");
    res.redirect("/listings");
    }
    catch(err)
    {
        next(err);
    }
};

module.exports.addListing=async (req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    if(req.body.image=="")
    {
        req.body.image="https://images.unsplash.com/photo-1523730205978-59fd1b2965e3?q=80&w=1054&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
    let listing=new Listing(req.body);
    listing.owner=req.user._id;
    listing.image={url,filename};
    await listing.save();
    req.flash("success", "Listing saved successfully!");
    res.redirect("/listings");
};

module.exports.destroyReview=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    if(!(checkObjectIdValidity(id) && checkObjectIdValidity(reviewId)))
    {
        req.flash("error","You have provided invalid Id format.");
        return next(new ExpressError(400, "Bad request: Id is not valid"));
    }
    let listing=await Listing.findById(id);
    let review=await Review.findById(reviewId);
    if(!listing || !review)
        return next(new ExpressError(404,"Listing or review does not exist"));
    if(!review.author._id.equals(req.user._id))
    {
        req.flash("error","You do not have authority to perform this action");
        return res.redirect(`/listings/${id}`);
    }
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted")
    res.redirect(`/listings/${id}`);
};

module.exports.createReview=async(req,res,next)=>{
    let {id}=req.params;
    if(!checkObjectIdValidity(id))
        return next(new ExpressError(400, "Bad requeset: Invalid id format"))
    let listing=await Listing.findById(id);
    if(!listing)
        return next(new ExpressErroressError(404,"Listing now found"));
    let review=new Review(req.body);
    listing.reviews.push(review);
    await review.save();
    await listing.save();
    req.flash("success","Review added successfully")
    res.redirect(`/listings/${id}`);
};