const mongoose=require('mongoose');
const Review=require("./review.js");
const { required } = require('joi');
const listingSchema=mongoose.Schema({
    title:
    {
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:
    {
        url:{type:String, required:true,default:"https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"},
        filename:{type:String,required:true}
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    reviews:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
});

listingSchema.post("findOneAndDelete",async (doc)=>{
    if(doc.reviews.length!=0)
        {
            try{
                await Review.deleteMany({_id:{$in:doc.reviews}});
                console.log("deleted all the reviews");
            }
            catch(err)
            {console.error(err)}
        }
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;