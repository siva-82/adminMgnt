import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import connectDB from './config/db.js';
const port =process.env.PORT || 5000;
import emplyRoutes from './routes/emplyRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

connectDB();
const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/emplys',emplyRoutes)
app.use('/api/upload',uploadRoutes)

if(process.env.NODE_ENV === 'production'){
    
    const __dirname=path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname,'/frontend/build')));
    
    app.get('*',(req,res) => 
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    );
}else{
    const __dirname=path.resolve();
    console.log('API is running...');
    app.use('/uploads', express.static(path.join(__dirname,'/uploads')))
    app.get('/',(req,res)=>{
    res.send('API is running...')})
}

// app.get('/',(req,res)=>res.send('Server is Ready'))


app.listen(port,()=>console.log(`Server started on port ${port}`))