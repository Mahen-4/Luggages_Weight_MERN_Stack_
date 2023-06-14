// import express, mongoose, cors and the model / schema we created 
const express = require('express');
const mongoose = require("mongoose");
const LuggageModel = require("./models/Luggage");
const cors = require("cors");
// app containing all express method and port we are going to listen to
const app = express();
const port = 3001

// the data we get from Front-end : transform into json syntax
app.use(express.json())

// allow use to get data from api
app.use(cors())

// need this line idk why
mongoose.set('strictQuery', true);


//connect to our cluster mongodb
mongoose.connect('mongodb+srv://new_user_CRUD:password1234@crud.6qhhnux.mongodb.net/Journey_SuitCases_Weight', {useNewUrlParser: true,});

// on the route "/" do this 
app.post("/insertUser", async(req, res) => {

    //get data from frond end
    const journeyCreator = req.body.journeyCreator
    const journeyName = req.body.journeyName

    //create doc with the luggage Model
    const luggage = new LuggageModel({
            JourneyCreator: journeyCreator,
            JourneyName: journeyName,         
        });
        try {
            //try to save it to the collection in mongoDb
            await luggage.save();
        } catch (error) {
            //if error do this
            console.log(error);
        }
  
    res.send("hello world here is the data i get from front end");
    
});



app.post("/readUser", async(req,res)=>{
    //get the username
    const userName = req.body.userName
    app.get("/readUserJourney", async(req,res)=>{
        //search for all journey where the journeyCreator is set to userName
        LuggageModel.find({JourneyCreator: userName}, (err,result)=>{
            err ? res.send(err) : res.send(result)
        })
    })
})
//push to a journey new suitcase or handluggage
app.post("/addLuggage", async(req,res)=>{
    const journeyCreator = req.body.journeyCreator
    const journeyName = req.body.journeyName
    const luggageName = req.body.luggageName;
    const luggageWeight = req.body.luggageWeight
    const luggageColor = req.body.luggageColor
    const luggageType = req.body.luggageType
    const updates = {AllLuggage: [{LuggageName: luggageName, Weight:luggageWeight,Color:luggageColor,LuggageType:luggageType }]}
    const filter =  {JourneyCreator: journeyCreator, JourneyName: journeyName}
    await LuggageModel.updateOne(filter,{$push: updates});
})

//get the journey name and the creator of the journey 
app.post("/insertJourneyAndRead", async(req,res)=>{
    const journeyCreator = req.body.journeyCreator
    const journeyName =  req.body.journeyName    
    const filter =  {JourneyCreator: journeyCreator, JourneyName: journeyName}

    //send the data we get from the filter to the front
    LuggageModel.findOne(filter, (err, result) => {
        err ? res.send(err) : res.send(result)
    })
})

app.post("/updateWeight", async(req,res)=>{
    const updateWeight = req.body.updateWeightvalue
    const luggageToUpdate = req.body.updateLuggage
    const journeyName = req.body.journeyname

    LuggageModel.updateOne({'AllLuggage.LuggageName':luggageToUpdate, 'JourneyName': journeyName}, {'$set': {'AllLuggage.$.Weight': updateWeight}},
    function(error,result){
        error ? res.send(error)  : res.send(result)
    })
})

app.post("/deleteLuggage", async(req,res)=>{
    const luggageToDelete = req.body.deleteLuggageName
    const journeyName = req.body.journeyname

    LuggageModel.updateOne({'JourneyName': journeyName, 'AllLuggage.LuggageName':luggageToDelete }, {'$pull': {"AllLuggage": {"LuggageName":luggageToDelete }} },
    function(err,result){
        err ? console.log(err) : res.send(result)
    })
})


app.post("/deleteJourney", async(req,res)=>{
    const journeyName = req.body.journeyname
    const journeyCreator = req.body.journeyCreator

    LuggageModel.findOneAndDelete({JourneyName: journeyName, JourneyCreator: journeyCreator}, (err,result)=>{
        err ? console.log(err) : res.send(result)
    })
})

//listen to the port 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
