const { Sequelize } = require("sequelize");
const { Clubes, Membros, Partidas, ClubesPartidas, MembrosPartidas, Robsoners } = require('../models')
const Op = Sequelize.Op;

//CREATE OR UPDATE A CLUB
exports.create = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
    const name = req.params.name;
    console.log(name)
    const robsoner = await Robsoners.findAll({
        where: {
            name: name
        },
        logging: console.log
    })
    
    console.log(robsoner)
    res.send(robsoner)

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