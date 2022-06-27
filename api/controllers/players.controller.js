const mongoose=require("mongoose");
const Team = mongoose.model(process.env.TEAMS_MODEL);
const getAll=function(req,res){
    console.log("get all team players");
    const teamId = req.params.teamId;
    Team.findById(teamId).select("players").exec(function(err,team){
        console.log("found players", team.players, "for team", team);
        res.status(200).json(team.players);
    })
};

const getOne=function(req,res){
    console.log("get one team player");
    const teamId = req.params.teamId;
    const playerId = req.params.playerId;
    Team.findById(teamId).select("players").exec(function(err,team){
        console.log("found player", team.players.id(playerId), "for team", team);
        res.status(200).json(team.players.id(playerId));
    })
};

const addOne=function(req,res){
    console.log("add one team player");
    const teamId = req.params.teamId;
    Team.findById(teamId).select("players").exec(function(err,team){
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
            _addPlayer(req,res,team);
        }else{
            res.status(response.status).json(response.message);
        }
    });
};

const _addPlayer=function(req,res,team){
    console.log("adding player");

    team.players.push(req.body);
    team.save(function(err, updatedTeam){
        const response = {status: 200, message:[]};
        if(err){
            response.status=500;
            response.message=err;

        }else{
            response.status=201;
            response.message=updatedTeam.players;
        }
        res.status(response.status).json(response.message);
    });
}

const deleteOne= function(req,res){
    console.log("delete player request");
    const teamId =  req.params.teamId;
    const playerId = req.params.playerId;
    Team.findById(teamId).select("players").exec(function(err,team){
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
            team.players.id(playerId).remove();
            team.save(function(err, updatedTeam){
                if(err){
                    response.status=500;
                    response.message=err;
        
                }else{
                    response.status=201;
                    response.message=updatedTeam.players;
                }
                res.status(response.status).json(response.message);
            });
        }else{
            res.status(response.status).json(response.message);
        }
    });
}

const patchUpdateOne = function(req,res){
    const updatedPlayerProperties = req.body;
    const teamId = req.params.teamId;
    const playerId = req.params.playerId;

    Team.findById(teamId).exec(function(err, team){
        const response={status: 200, message:{}};
        if(err){
            response.status = 500;
            response.message= "Wrong input";
        }
        else if(!team){
            response.status = 404;
            response.message= "team not found";
        }
        else{
            if(!team.players.id(playerId)){
                response.status = 404;
                response.message= "Player not found";
                res.status(response.status).json(response.message);
            }else{
                const player = team.players.id(playerId);
                if(updatedPlayerProperties.name){
                    player.name = updatedPlayerProperties.name;
                }
                if(updatedPlayerProperties.startYear){
                    player.startYear = updatedPlayerProperties.startYear;
                }
                team.save(function(err, updatedPlayer){
                    if(err){
                        console.log("Could not update Player");
                        response.status = 500;
                        response.message = err;
                    }else{
                        response.message= updatedPlayer;
                    }
                    res.status(response.status).json(response.message);
                });
            }
            return;
        }
        res.status(response.status).json(response.message);
    });
}

const fullUpdateOne = function(req, res){
    const updatedPlayerProperties = req.body;
    const teamId = req.params.teamId;
    const playerId = req.params.playerId;

    Team.findById(teamId).exec(function(err, team){
        const response={status: 200, message:{}};
        if(err){
            response.status = 500;
            response.message= "Wrong input";
        }
        else if(!team){
            response.status = 404;
            response.message= "team not found";
        }
        else{
            if(!team.players.id(playerId)){
                response.status = 404;
                response.message= "Player not found";
                res.status(response.status).json(response.message);
            }else{
                const player = team.players.id(playerId);
                if(updatedPlayerProperties.name){
                    player.name = updatedPlayerProperties.name;
                }
                if(updatedPlayerProperties.startYear){
                    player.startYear = updatedPlayerProperties.startYear;
                }
                team.save(function(err, updatedPlayer){
                    if(err){
                        console.log("Could not update Player");
                        response.status = 500;
                        response.message = err;
                    }else{
                        response.message= updatedPlayer;
                    }
                    res.status(response.status).json(response.message);
                });
            }
            
            return;
        }
        res.status(response.status).json(response.message);
    });


}

module.exports = {
    getAll:getAll,
    getOne:getOne,
    addOne:addOne,
    deleteOne:deleteOne,
    patchUpdateOne:patchUpdateOne,
    fullUpdateOne:fullUpdateOne
}