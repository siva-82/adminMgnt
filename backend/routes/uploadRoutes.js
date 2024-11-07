import path from "path";

import express from "express";
import multer from "multer";
const router = express.Router();
import cloudinary from "../utils/cloudinary.js";
import Emplys from "../models/emplysModel.js";


const storage = multer.diskStorage({
  // destination(req,file,cb){
  //     cb(null,'uploads')
  // },
  // filename(req,file,cb){
  //     console.log('uploadRoutes from Storage req.file '+req);
  //     cb(
  //         null,
  //         `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
  //     );
  // },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

// const getUsers = asyncHandler(async(req,res)=>{
//   const emplys= await Emplys.find({}).sort({createdAt: 1})
  
//   res.status(200).json(emplys)
// })
// const getUserProfile = asyncHandler(async(req,res)=>{
//   const emply= await Emplys.findById(req.user._id)
//   const user= {
//       _id:req.user._id,
//       name:req.user.name,
//       email:req.user.email
//   }
//   res.status(200).json({
//       _id:emply._id,
//       name:emply.name,
//       emplyImg:emply.imgUrl,
//       email:emply.email, 
//       contact:emply.contact
//    })
// })


router.put("/:id", async (req, res) => {
 console.log("PUT")
  uploadSingleImage(req, res, async function (err) {
     
    console.log("PUT",req.params.id)
    console.log("PUT BODY",req.body)

    try {
      

      let emp = await Emplys.findById(req.params.id);
      
let result
      if (emp) {
        if(req.file){

          await cloudinary.uploader.destroy(emp.cloudinary_id);

        result = await cloudinary.uploader.upload(req.file.path);
        emp.image = result.secure_url 
        emp.cloudinary_id = result.public_id 
        }

        emp.name = req.body.name 
        emp.email = req.body.email 
        emp.contact = req.body.contact 

       if(!result){
        emp.image =  emp.image;
        emp.cloudinary_id = emp.cloudinary_id;
       }

        const updatePost = await emp.save();

        res.json(updatePost);
      }else {
        res.status(404);
        throw new Error('Emp not found');
      }
    } catch (error) {
      console.log("catch");
      
    }
  });
});

router.delete("/:id", async (req, res) => {
  console.log("upload/:id ");

  console.log(req.params.id);
 
    try {
    
      let emp = await Emplys.findById(req.params.id);
      console.log("post");
      console.log(emp);

      if (emp) {
        await cloudinary.uploader.destroy(emp.cloudinary_id);

        await emp.deleteOne({ _id: emp._id });
      res.json({ message: 'Post Deleted' });

        
      }else {
        res.status(404);
        throw new Error('Post not found');
      }
    } catch (error) {
      console.log("catch");
      console.log(error);
    }

});
router.post('/addEmp',async(req,res)=>{
  uploadSingleImage(req, res, async function (err) {
  
  const {name, email, contact} =req.body;
  console.log("name, email, contact",name, email, contact)


  try {
    
      const empExist = await Emplys.findOne({email})
       console.log("empExist",empExist)
       if(empExist){
        console.log("empExist")

           res.status(400);
           throw new Error('Emp already exists' );

       }
       const result = await cloudinary.uploader.upload(req.file.path);
   
       const emp= await Emplys.create({
           name,email,contact,
           image: result.secure_url,
        cloudinary_id: result.public_id,
       })
   console.log("create emp",emp)
   
       if(emp){
         console.log("if emp",emp)
           res.status(201).json({
               _id: emp._id,
               name: emp.name,
               contact:emp.contact,
               email:emp.email
           })
       }else{
           res.status(400)
           throw new Error('Invalid Emp Data')
       }
  } catch (error) {
    console.log("catch");
      console.log(error);
  }

 
  });
})
export default router;
