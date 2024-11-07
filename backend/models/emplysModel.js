import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'


const emplysSchema=mongoose.Schema(
    {

         
        name:{
            type:String,
            required:true,
            
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        
        contact:{
            type:String,
            required:true
        },

        image:{
            type:String,
        },
        cloudinary_id:{
            type:String,
        },
    },
    {
        timestamps:true
    }
);

// emplysSchema.pre('save',async function(next){
//     if(!this.isModified('password')){
//         next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password=await bcrypt.hash(this.password,salt)
// });

// emplysSchema.methods.matchPassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password)
// }

const Emplys=mongoose.model('Emplys',emplysSchema);
export default Emplys;