const mongoose=require("mongoose");

const playerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    startYear:{
        type: Number
    }
});
const nbaSchema = mongoose.Schema({
    "teamName": String,
    "state": String,
    "conferenceFinalsCount": Number,
    "players": [playerSchema]
});
mongoose.model("Team", nbaSchema, "teams");