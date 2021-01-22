module.exports = app => {
    const robsonersController = require("../controllers/robsoners");
    var router = require("express").Router();
    
    router.get('/:name', robsonersController.findOne);
    
    app.use('/api/robsoners', router);
};
