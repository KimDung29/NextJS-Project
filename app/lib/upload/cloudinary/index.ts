import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDIARY_NAME, 
  api_key: process.env.CLOUDIARY_KEY, 
  api_secret:  process.env.CLOUDIARY_SECRET
});

export default cloudinary;