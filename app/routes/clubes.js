module.exports = app => {
    const clubesController = require("../controllers/clubes");
    var router = require("express").Router();
    
    router.get('/:id', clubesController.findOne);
    
    app.use('/api/clubes', router);
};
