const joi=require("joi");
const ExpressError = require("./ExpressError");

const validate=joi.object({
    title:joi.string().required(),
    description:joi.string().required(),
    image:joi.string().allow("",null),
    price:joi.number().required().min(0),
    location:joi.string().required(),
    country:joi.string().required()
});

function validateListing(req,res,next)
{
    let result=validate.validate(req.body);
    if(result.error)
        return next(new ExpressError(400,result.error.message));
    next();
}

module.exports=validateListing;