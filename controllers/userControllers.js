const User = require("../models/user.js");


module.exports.getSignupPage=(req,res)=>{
    res.render("signup.ejs");
};

// TODO- gives error that user is already registered
module.exports.registerUser=async(req,res,next)=>
    {
        try{
        let {username,email,password} =req.body;
        let user= User({username,email});
        let registeredUser=await User.register(user,password);
        req.login(registeredUser,(err)=>{
            if(err)
                return next(err);
            req.flash("success","User registered successfully");
            return res.redirect("/listings");
        })
        }
        catch(err)
        {
            console.log(err);
            req.flash("error","A user with the given username is already registered");
            res.redirect("/signup");
        }
    };

module.exports.getLoginPage=(req,res)=>{
    res.render("login.ejs");
};

module.exports.loginUser=async(req,res)=>{
    req.flash("success", "Login successfully");
    //can implement regex for delete requests... you cant redirect to deleted content
    return res.redirect(res.locals.redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logOut(err=>{
        if(err)
            next(err);
        req.flash("success","Logout successfully");
        res.redirect("/listings");
    })
};