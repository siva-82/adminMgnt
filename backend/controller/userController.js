import asyncHandler from 'express-async-handler'
import Emplys from '../models/emplysModel.js'





const getEmplys = asyncHandler(async(req,res)=>{
    console.log("getEmplys")
    const emplys= await Emplys.find({}).sort({createdAt: 1})
    
    res.status(200).json(emplys)
})
const getEmplyProfile = asyncHandler(async(req,res)=>{
    console.log("getsingleEmplys")

    const emply= await Emplys.findById(req.params.id)
    res.status(200).json({
        _id:emply._id,
        name:emply.name,
        emplyImg:emply.image,
        email:emply.email, 
        contact:emply.contact
     })
})



export { getEmplys,  getEmplyProfile}
