const mongoose=require('mongoose');

function checkObjectIdValidity(id)
{
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports=checkObjectIdValidity;