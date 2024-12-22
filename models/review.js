const mongoose=require('mongoose');

const reviewSchema=mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
});

module.exports=mongoose.model("Review", reviewSchema);