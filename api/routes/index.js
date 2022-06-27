const express = require("express");
const teamsControler = require("../controllers/teams.controller");
const playersControler = require("../controllers/players.controller");

const router = express.Router();

router.route("/teams/:teamId")
    .get(teamsControler.getOne)
    .patch(teamsControler.patchUpdateOne)
    .put(teamsControler.fullUpdateOne)
    .delete(teamsControler.deleteOne);
router.route("/teams")
    .get(teamsControler.getAll)
    .post(teamsControler.addOne)

router.route("/teams/:teamId/players")
    .get(playersControler.getAll)
    .post(playersControler.addOne);
router.route("/teams/:teamId/players/:playerId")
    .get(playersControler.getOne)
    .patch(playersControler.patchUpdateOne)
    .put(playersControler.fullUpdateOne)
    .delete(playersControler.deleteOne);

module.exports = router;