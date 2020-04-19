const express=require('express')
const morgan=require("morgan");
const dotenv =require("dotenv");
const app=express();

// 
dotenv.config({path:'./config.env'});
// Dev logging
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}
// profile routes 
app.use('/api/v1/profile', require('./routes/profile'));

//Handle production

if(process.env.NODE_ENV==='production'){
    app.use(express.static(__dirname+'/public/'));

    // Handle SPA if does not match
    app.get("/.*/",(req,res)=>{
       res.sendfile(__dirname +'/public/index.html')
    })
}

const port=process.env.PORT || 8000;



app.listen(port,()=>{
console.log(`app listeing in port ${process.env.NODE_ENV} mode on port ${port}`);
})
