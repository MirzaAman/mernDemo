const express = require("express");
const app = express();
const mongoose = require("mongoose")
const userModel = require('./model/users');
const cors = require("cors")
const port = process.env.PORT || 3001

app.use(express.json());
app.use(cors()); 

mongoose.connect("mongodb+srv://mzawyd:9544886696ska@demo.rxfmxhv.mongodb.net/mirchu?retryWrites=true&w=majority")

app.get('/getUsers',async(req,res)=>{
    userModel.find({}).then((err,result)=>{
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    }) 
});


app.post('/newUser',async (req,res)=>{
    const user = req.body;
    const newUser = new userModel(user);
    await newUser.save();

    res.json(user) 
})

app.listen(port,()=>{
    console.log("Server started on ",port);
})
