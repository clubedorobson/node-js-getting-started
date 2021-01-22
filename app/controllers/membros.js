const { Sequelize } = require("sequelize");
const { Clubes, Membros, Partidas, ClubesPartidas, MembrosPartidas } = require('../models')
const Op = Sequelize.Op;

//CREATE OR UPDATE A CLUB
exports.create = (req, res) => {

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const clubId = req.params.clubId;
    Membros.findAll({
        where: {
            clubid : clubId
        }
    }).then(result => {
        res.send(result);
    }).catch(err=> {
        res.status(500).send({
            message: "Não foi possível encontrar o membro do clube com id " + clubId
        });
    })
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    const clubId = req.params.clubId;
    console.log()
    Membros.findAll({
        
        where: {
            name: id,
            clubid: clubId
        }, 
        include : [
            {association: 'membrosClubes'},
            {association: 'membrosMembrosPartidas', 
                order: [
                    ['updatedAt', 'DESC']
                ], 
            limit: 1}
        ]
    }).then(result => {
        res.send(result);
    }).catch(err=> {
        res.status(500).send({
            message: "Não foi possível encontrar o clube com id " + id 
        });
    })
};

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