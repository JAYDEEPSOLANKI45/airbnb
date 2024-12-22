module.exports.isLogined=(req,res,next)=>{
    if(!req.isAuthenticated())
    {
        req.session.redirectUrl=req.originalUrl;
        //used return because it was sending multiple headers...
        req.flash("error","login first");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    res.locals.redirectUrl=req.session.redirectUrl || "/listings";
    next();
}