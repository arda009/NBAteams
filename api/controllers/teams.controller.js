const mongoose=require("mongoose");
const Team = mongoose.model(process.env.TEAMS_MODEL);

const getAll=function(req, res){
    Team.find().exec(function(err,teams){
        if(err){
            console.log("Error finding Teams");
            res.status(500).json(teams);
        }else{
            console.log("Found Teams", teams.length);
            res.status(200).json(teams);
        }
        
    });
};

const getOne=function(req,res){
    const teamId=req.params.teamId;
    Team.findById(teamId).exec(function(err, team){
        const response={status: 200, message:[]}
        if(err){
            console.log("Error finding Team");
            response.status= 500;
            response.message = err;
        }
        else if(!team){
            response.status = 400;
            response.message = "Invalid team Id";

        } else{
            response.message = team;
        }
        res.status(response.status).json(response.message);
        
    })
}

const addOne=function(req,res){
    console.log("Team Post one request");
    console.log(req.body);
    const newTeam= req.body;
    Team.create(newTeam, function(err,team){
        const response={status:201, message:team};
        if(err){
            console.log("Error creating team"); 
            response.status= 500; 
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}   

const deleteOne = function(req,res){
    console.log("delete team request");
    const teamId =  req.params.teamId;
    Team.findByIdAndDelete(teamId).exec(function(err, deletedTeam){
        const response = {status:204, message: deletedTeam};
        if(err){
            console.log("Error finding team");
            response.status=500;
            response.message=err;
        }else if(!deletedTeam){
            console.log("team id not found");
            response.status= 404;
            response.message={
                message:"team id not found"
            };
        }
        res.status(response.status).json(response.message);
    })
}

const patchUpdateOne = function(req, res){
    const newTeam=req.body;

    Team.findById(req.params.teamId).exec(function(err,team){
        console.log("found team",  team);
        const response={status: 200, message:team};
        if(err){
            console.log("Error finding team");
            response.status=500;
            response.message=err;
        }else if(!team){
            console.log("Error finding team");
            response.status = 404;
            response.message={"message": "Team id not found "+teamId};
        }
        if(team){
            if(newTeam.teamName){
                team.teamName= newTeam.teamName;
            }
            if(newTeam.state){
                team.state=newTeam.state;
            }
            if(newTeam.conferenceFinalsCount){
                team.conferenceFinalsCount=newTeam.conferenceFinalsCount;
            }
            if(newTeam.players){
                team.players = newTeam.players;
            }
            
            team.save(function(err, updatedTeam){

                if(err){
                    response.status=500;
                    response.message=err;
        
                }else{
                    response.status=201;
                    response.message=updatedTeam;
                }
                res.status(response.status).json(response.message);
            });
        }else{
            res.status(response.status).json(response.message);
        }
    });
}

const fullUpdateOne= function(req, res){
    const newTeam=req.body;

    Team.findById(req.params.teamId).exec(function(err,team){
        const response={status: 200, message:team};
        if(err){
            console.log("Error finding team");
            response.status=500;
            response.message=err;
        }else if(!team){
            console.log("Error finding team");
            response.status = 404;
            response.message={"message": "Team id not found "+teamId};
        }
        if(team){
            console.log("found team",  team);
            if(!newTeam.teamName || !newTeam.state ||
                !newTeam.conferenceFinalsCount || !newTeam.players){
                    console.log("Error updating team");
                    response.status=500;
                    response.message="There should not be empthy fields";
                    res.status(response.status).json(response.message);
                
            }else {
                    team.teamName= newTeam.teamName;
                    team.state=newTeam.state;
                    team.conferenceFinalsCount=newTeam.conferenceFinalsCount;
                    // if(newTeam.players.name && newTeam.players.startYear)
                    team.players = newTeam.players;
                    team.save(function(err, updatedTeam){

                        if(err){
                            response.status=500;
                            response.message=err;
                
                        }else{
                            response.status=201;
                            response.message=updatedTeam;
                        }
                        res.status(response.status).json(response.message);
                    });
            }
            
        }else{
            res.status(response.status).json(response.message);
        }
    });
}

module.exports = {
    getAll: getAll,
    getOne:getOne,
    addOne:addOne,
    deleteOne:deleteOne,
    patchUpdateOne:patchUpdateOne,
    fullUpdateOne:fullUpdateOne
}