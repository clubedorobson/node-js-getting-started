const { Sequelize } = require("sequelize");
const { Clubes, Membros, Partidas, ClubesPartidas, MembrosPartidas, Seasonals } = require('../models')
const Op = Sequelize.Op;

exports.findAll = (req, res) => {
    console.log("AQUIIIII")
    //const clubId = req.params.clubId;
    Seasonals.findByPk(6703918).then(result => {
        console.log(result)
        res.send(result);
    }).catch(err=> {
        res.status(500).send({
            message: "Não foi possível encontrar o clube com id" 
        });
    })
};

