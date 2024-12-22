const mongoose=require('mongoose');
const express=require('express');
const path=require("path");
const methodOverride=require("method-override");
const engine=require("ejs-mate");
const listingRoute=require("./routes/listing.js");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require('passport');
const localStrategy=require("passport-local");
const User=require("./models/user.js");
const userRoute=require("./routes/user.js");
require("dotenv").config();

const app=express();
const port=8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.engine("ejs",engine);
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*3600*1000,
        maxAge:7*24*3600*1000,
        httpOnly:true
    },
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_ATLAS_URL,
        crypto:{
            secret:process.env.SECRET
        },
        touchAfter:24*3600
    })
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const mongodbAtlasUrl=process.env.MONGODB_ATLAS_URL
async function main(){

    //use .env file for mongodb link
    await mongoose.connect(mongodbAtlasUrl);
}
main().then(res=>console.log("Successfully Connected")).catch(err=>console.log(err));

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
});

app.use("/listings",listingRoute);
app.use("/",userRoute);

app.all("*", (req,res)=>{
    res.render("error.ejs", {status:404, message:"Page not found"})
});

app.use((err,req,res,next)=>{
    let {status=500, message="Something broke!"}=err;
    console.log(message);
    res.render("error.ejs", {status, message});
});

app.listen(port, (req,res)=>console.log("listening"));