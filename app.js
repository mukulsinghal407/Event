const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const alert = require('alert');

mongoose.connect("mongodb+srv://saic:saic@cluster0.vqpjs.mongodb.net/saic",{
  useUnifiedTopology: true,
  useNewUrlParser: true,
});


function value(a)
{
 for(let i=0;i<20;++i)
 {
   if(a===locations[i])
    return i;
 }
}

function complete(a)
{
  switch(a.alpha)
  {
    case 0: return a.location===4;
    case 1: return a.location===9;
    case 2: return a.location===14;
    case 3: return a.location===19;
  }
}

const raste = [
  [
    "Cricket ki duniya ke peeche basa ek sansaar hai",
    "Jaha logo ke kaam se jyada, logo ke karnamo ka vivaad hai",
    "Raaste kai hote hai khatam wahan,",
    "Patthar laga kar, taron ke neeche se, log bante waha kharidaar hai."
  ],
  [
    "Aage chaon piche khai",
    "Kabhi yaha bhi rehte the sab bhai",
    "Konsi hai yeh jagah",
    "Jaha ghar jesa tha sama"
  ],
  [
    "Shyam ko machi hulchul mai",
    "Din ki tadakti dhoop mai",
    "Subah ko lagti bhook mai",
    "uss jagah ke khajane mai",
    "Main hun chupa"
  ],
  [
    "Ek bada sa maidan hai",
    "Jitna door utna  hi paas hai",
    "Shyam mai kai log dikhte hai yahan",
    "Paseene mai lathpath log daudte hai jaha"
  ],
  [
    "Naya hai yeh raasta",
    "Jaata hai kahan kya pata",
    "Bagal mein hai 5 star hotel",
    "Hariyali har jagah hai yaha"
  ],
  [
    "To a new beginning which comes second,",
    "Engraved with Stories of the past which have come to an end.",
    "Building things from the scratch,",
    "looking for new memories to attach."
  ],
  [
   "If you ask about its length , It's about nine-tenths as long as Baseball base distance,",
   "To conquer the flag of victory here , you need a lot of  persistence.",
   "Dodging a hurdle as long as a baseball bat determines you score in this game,",
   "In a game of 15-30-40 you make your name."
  ],
  [
    "It is an isolated region with nothing to explore,",
    "But you find its residents always trying to implore.",
    "It has a view which represents the indian pride,",
    "But you need to wonder if the ball went offside ?"
  ],
  [
    "Here the adrenaline rush decides the success ,",
    "But losing here will never cause you distress .",
    "Your aim here is to always win ,",
    "But after every victory you just begin !"
  ],
  [
    "The evenings here are relatively darker,",
    "But it is just an empty path near a quarter.",
    "It was once a haunted lane,",
    "But you can never find its ghost until you try again."
  ],
  [
    "Thapar ke andar hai bhi par rehta sabse alag hai,",
    "Iske gate se pehli baar aadha thapar nikla bahar hai.",
    "Aage jungle, peeche taaren, daye me bacche toh baye me basa professors ka ghar baar hai.",
    "Bas jao yaha, iske gate pr tumhare doosri manzil hai."
  ],
  [
    "Iss jaga ke kya hi kahne,",
    "Choti si jagah hai",
    "Kisse hai rangeen yaha ke,",
    "Rangeen patthro se likha hai iska naam,",
    "Paas me tanga hai tumhare is paheli ka anjaam"
  ],
  [
    "Ek taraf mor naache",
    "Ek tarah bachhe bhaage",
    "Anjaana rasta kuchh log hi jaane",
    "Chotta hi hai raah",
    "Socho kaunsi hai jagah"
  ],
  [
    "Ek chota raasta hai,",
    "Kuch logo ko anjaan , kuch logo ki roj ki daastan hai",
    "Do deewar hai",
    "Ek seedhi khadi toh doosri uske samne ladi  hai",
    "Uss deewar ko khojo, wahi tunhari manzil padi hai."
  ],
  [
    "Kahi logon ke liye aage hai jannat",
    "Kahi ke liye peeche",
    "Kahi sawalon ke jawaab hai yahan",
    "Kahi pahunchna yahan se asaan",
    "Iska dar bhi alag hi hai  jisse dhoop me na chale kai insaan",
    "Socho kaunsi jagah"
  ],
  [
    "Life is a race",
    "You need to follow the teacher’s path",
    "Living under the same reign",
    "may lead you somewhere not too far"
  ],
  [
    "You may or may not have to search",
    "Very long or far",
    "This is where you keep",
    "The recently made red art"
  ],
  [
    "Chalte hai affair bohot",
    "Upar lover",
    "Neeche maut",
    "You will regret going here a lot"
  ],
  [
    "Are you getting hungry",
    "It’s time to eat",
    "Budget is not a problem",
    "Just fulfill your feast"
  ],
  [
    "If you find me you win this bet",
    "But just another alphabet",
    "I have a brother",
    "Having genes from octagonal mother"
  ]
];

const locations=["KHostel","FRDE","Cossbi","fete","M","Bgate","TennisCourt","Khostel","SportsComplex","PGwalaArea","PolytechnicGate","LHostel","CORE","GHostelWall","TAN","FacultyResidenceLib","TSLASGate","DOSAOff","GBlockGate","FBlockEnt"];


//Setting things up
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const count = new mongoose.Schema({
  count:Number
});

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

const users = mongoose.model("users",user);
const alpha = mongoose.model("count",count);

app.get("/",(req,res)=>
{
  res.render("clue",{title:"",info:"The Registrations Has ended"});
});

app.get("/login",(req,res)=>
{
  // res.render("clue",{title:"",info:"The Event will start on 27th Feb 2022."});
 res.render("login");
});

app.get("/:no",(req,res)=>
{
  // res.render("clue",{title:"",info:"The Event will start on 27th Feb 2022."});
  res.render("form",{title:"checkpoint",info:req.params.no});
});


app.post("/login",(req,res)=>{
  const user = req.body.name;
  const password = req.body.password;
  console.log(user+" "+password);
  users.findOne({teamName:user,password:password},(err,result)=>
  {
    if(!err && result && !complete(result))
    {
      if(result)
      {
        // console.log(result);
        res.render("test",{title:"Clue",array:raste[result.location]});
      }
    }
    else if(complete(result))
    {
      res.render("clue",{title:"The Hunt Is Over",info:""})
    }
    else
    {
      res.send("error");
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
    alpha.find({},(err,result)=>
    {
      let alloc = (result[0].count)%4;
      console.log(alloc);
      let loc = 0;
        switch(alloc)
        {
            case 0:loc=0;break;
            case 1:loc=5;break;
            case 2:loc=10;break;
            case 3:loc=15;break;
        }
        const tempUser=new users({
          teamName:req.body.teamName.trim(),
          password:req.body.password.trim(),
          teamMember1:teamMember1,
          teamMember2:teamMember2,
          teamMember3:teamMember3,
          teamMember4:teamMember4,
          alpha:alloc,
          location:loc,
          time:[]
        });
        result[0].count= (result[0].count+1)%4;
        result[0].save();
        users.findOne({teamName:req.body.teamName},(err,result)=>
        {
          if(!err)
          {
            if(result)
            {
              // alert("The Team Name Already Exists"); 
              res.render("clue",{title:"Team Name Already Exists",info:"You are requested to try another name for registration."});
            }
            else
            {
              tempUser.save((err)=>
              {
                if(!err) 
                {
                  console.log("Success");
                  res.render("clue",{title:"Registration Successful",info:""});
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
});

app.post("/:number",(req,res)=>
{  
  var date = new Date;
  date = date.toTimeString(); 
  users.findOne({teamName:req.body.name},(err,result)=>
    {
      const placenumber = value(req.params.number);
      if(!err && !complete(result))
      {
        console.log(result.location);
        console.log(placenumber);
        if(result.location!=placenumber)
        {
          res.render("clue",{title:"Wrong Location!!",info:""});
        }
        else
        {
          switch(result.alpha)
          {
            case 0:{
              if(req.params.number==="M" && result.location===4)
               res.render("clue",{title:"The Hunt Has Succeeded !!",info:""});
              else 
               res.render("test",{title:"Clue",array:raste[result.location+1]});
            }break;
            case 1:{
              req.params.number==="PGwalaArea"&& result.location===9?res.render("clue",{title:"The Hunt Has Succeeded !!",info:""}):res.render("test",{title:"Clue",array:raste[result.location+1]});
            }break;
            case 2:{
              req.params.number==="TAN" && result.location===14?res.render("clue",{title:"The Hunt Has Succeeded !!",info:""}):res.render("test",{title:"Clue",array:raste[result.location+1]});
            }break;
            case 3:{
              req.params.number==="FBlockEnt" && result.location===19?res.render("clue",{title:"The Hunt Has Succeeded !!",info:""}):res.render("test",{title:"Clue",array:raste[result.location+1]});
            }break;
          }         
          result.location+=1;
          result.time.push(date);
          result.save();
        }
      }
      else if(complete(result))
       res.render("clue",{title:"The Hunt Is Over",info:""});
      else
        res.send("error");
    }); 
});


app.listen(process.env.PORT||5000,(req,res)=>{
    console.log("Server Started at 3000");
});
