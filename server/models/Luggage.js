//import mongoose
const mongoose = require('mongoose')

// create new schema 
const LuggageSchema = new mongoose.Schema({
    JourneyCreator: {
        type: String,
        required: true,
    },
    JourneyName: {
        type: String,
        required: true,
    },
    AllLuggage: [
        {
            LuggageName: {type: String,required: true},
            Weight: {type: Number,required: true},
            Color: {type: String,required: true},
            LuggageType: {type: String, required: true}
        }
    ],
    
    
    
})
//creating a model from the schema we created
const Luggages = mongoose.model("suit", LuggageSchema);
//exporting the model
module.exports = Luggages;