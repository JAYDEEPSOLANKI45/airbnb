const joi=require('joi');
const ExpressError = require('./ExpressError');

const validate=joi.object({
    comment:joi.string(),
    rating:joi.number().min(1).max(5),
    author:joi.string().required()
});

function validateReview(req,res,next)
{
    let result=validate.validate(req.body);
    if(result.error)
        return next(new ExpressError(400,result.error.message));
    next();
}
module.exports=validateReview;