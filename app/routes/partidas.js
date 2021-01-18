module.exports = app => {
    const partidasController = require("../controllers/partidas");
    var router = require("express").Router();
    
    router.get('/:id', partidasController.findOne);
    
    
    app.use('/api/partidas', router);
};