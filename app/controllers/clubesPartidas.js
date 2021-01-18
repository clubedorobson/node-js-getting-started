const { Sequelize } = require("sequelize");
const logger = require("../../common/logger");
const { Clubes, Membros, Partidas, ClubesPartidas, MembrosPartidas } = require('../models')
const Op = Sequelize.Op;

//CREATE OR UPDATE A CLUB
exports.create = (req, res) => {

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    ClubesPartidas.findByPk(id).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(500).send({
            message: "Não foi possível encontrar o clube com id " + id
        });
    })
};

exports.findSeasons = (req, res) => {
    console.log("kkkk", req.params.clubId)
    const clubId = req.params.clubId
    ClubesPartidas.findAll({
        where: {
            clubId: clubId
        },
        attributes: ['seasonid']
    }).then(result => {
        res.send(result);
    }).catch(err => {
        res.status(500).send({
            message: "Não foi possível encontrar o clube com id " + clubId
        });
    })
}

exports.getBySeason = async (req, res) => {
    //console.log("kkkk", req.params.clubId)
    console.log("jjj", req.params)
    const clubId = req.params.clubId
    const seasonId = req.params.seasonId
    const seasonMatches = await ClubesPartidas.findAll({
        where: {
            clubId: clubId,
            seasonid: seasonId
        },
        include: [
            { association: 'clubesPartidasPartidas' },
        ],
        logging: console.log
        //attributes: ['seasonid']
    })
    //logger.trace(seasonMatches)
    let matchesToReturn = [];
    seasonMatches.forEach(clubesPartida => {
        matchesToReturn.push(clubesPartida.dataValues.matchId)
    })
    logger.error(matchesToReturn)

    const partidasSeason = await Partidas.findAll({
        where: {
            matchId: { [Op.in]: matchesToReturn }
        },
        include: [
            {association: 'partidasHomeClub'},
            {association: 'partidasAwayClub'}
        ],
        
    })
    logger.info(partidasSeason)
    seasonMatches.partidasSeason = partidasSeason
    //logger.info(seasonMatches)
    res.send({seasonMatches, partidasSeason});
}

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};