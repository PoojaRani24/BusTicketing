const express = require('express');
const router  = express.Router();

//----------Open up all tickets---------

router.post('/',(req,res,next) => {
    res.status(201).json({
        message : "Handling POST Request to /admin"
    });
});

module.exports = router;