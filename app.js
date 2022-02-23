const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const alert = require('alert');

const riddles = [];
var alpha = 0;

mongoose.connect("mongodb+srv://saic:saic@cluster0.vqpjs.mongodb.net/saic",{
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//Setting things up
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const individual = {
  name: String,
  phone:String,
  email:String,
  roll: String,
  year:String
};

const user = new mongoose.Schema({
  teamName:{type:String,required:true},
  password:{type:String,required:true},
  teamMember1:{type:individual,required:true},
  teamMember2:{type:individual,required:true},
  teamMember3:{type:individual,required:true},
  teamMember4:{type:individual},
  alpha:{type:Number},
  location:Number,
  time:[{type:String}]
});

const users = mongoose.model("debug",user);

app.get("/",(req,res)=>
{
  res.render("register");
});

app.get("/qr/:no",(req,res)=>
{
  res.render("form",{info:req.params.no});
});

app.get("/login",(req,res)=>
{
  res.render("clue",{title:"",info:"The Event will start on 27th Feb 2022."});
//  res.render("login");
});

app.post("/login",(req,res)=>{
  const user = req.body.name;
  const password = req.body.password;
  users.findOne({teamName:user,password:password},(err,result)=>
  {
    if(!err)
    {
      if(result)
      {
        res.render("clue",{title:"Clue",info:riddles[result.loc]});
      }
    }
    else
    {
      res.render("error");
    }
  });
});

app.post("/register",function(req,res){
    const teamMember1 = {
      name:req.body.teamMember1Name,
      phone:req.body.teamMember1Phone,
      email:req.body.teamMember1Email,
      roll:req.body.teamMember1Roll,
      year:req.body.teamMember1Year
    };
    const teamMember2 = {
      name:req.body.teamMember2Name,
      phone:req.body.teamMember2Phone,
      email:req.body.teamMember2Email,
      roll:req.body.teamMember2Roll,
      year:req.body.teamMember2Year
    };  
    const teamMember3 = {
      name:req.body.teamMember3Name,
      phone:req.body.teamMember3Phone,
      email:req.body.teamMember3Email,
      roll:req.body.teamMember3Roll,
      year:req.body.teamMember3Year
    };
    const teamMember4 = {
        name:req.body.teamMember4Name,
        phone:req.body.teamMember4Phone,
        email:req.body.teamMember4Email,
        roll:req.body.teamMember4Roll,
        year:req.body.teamMember4Year
    };
    alpha = (alpha)%4;
    let loc = 0;
    switch(alpha)
    {
        case 0:loc=0;break;
        case 1:loc=5;break;
        case 2:loc=10;break;
        case 3:loc=15;break;
    }
    const tempUser=new users({
      teamName:req.body.teamName,
      password:req.body.password,
      teamMember1:teamMember1,
      teamMember2:teamMember2,
      teamMember3:teamMember3,
      teamMember4:teamMember4,
      alpha:alpha,
      location:loc,
      time:[]
    });
    alpha+=1;
    users.findOne({teamName:req.body.teamName},(err,result)=>
    {
      if(!err)
      {
        if(result)
        {
          alert("The Team Name Already Exists"); 
          res.redirect("/");
        }
        else
        {
          tempUser.save((err)=>
          {
            if(!err) 
            {
              console.log("Success");
              res.render("clue",{title:"Registration Successful",info:"Successfully Registered"});
            }
            else res.render("error");
          });
        }
      }
      else
      {
        res.render("error");
      }
    });
});

app.post("/qr/:number",(req,res)=>
{
    users.findOne({teamName:req.body.name},(err,result)=>
    {
      if(!err)
      {
        if((result.location+1) === parseInt(req.params.number))
          {
              var date = new Date;
              date = date.toTimeString();
              users.findOneAndUpdate({teamName:req.body.name},{location:parseInt(req.params.number), $push:{time:date}},(err)=>{
                  if(err)
                  {
                      res.send("error");
                  }
              });
              res.render("clue",{info:riddles[parseInt(req.params.number)]});
          }
          else
          {
            alert("Wrong Location!!");
            res.render("clue",{info:riddles[result.location]});
          }
      }
      else
      {
        res.send("error");
      }
    }); 
});

app.listen(5000,()=>{
    console.log("Server Started at 3000");
});
