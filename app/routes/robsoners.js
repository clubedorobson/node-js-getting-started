module.exports = app => {
    const robsonersController = require("../controllers/robsoners");
    var router = require("express").Router();
    
    router.get('/:name', robsonersController.findOne);
    router.get("/", robsonersController.findAll);
    
    app.use('/api/robsoners', router);
};
