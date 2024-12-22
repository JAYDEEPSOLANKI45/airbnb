const cloudinary=require("cloudinary").v2;
const {CloudinaryStorage}=require("multer-storage-cloudinary");

cloudinary.config({
    api_secret:process.env.CLOUD_API_SECRET,
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY
});

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"wanderlust_DEV",
        allowedFormats:["png","jpeg","jpg"],
    }
});

module.exports={cloudinary,storage};