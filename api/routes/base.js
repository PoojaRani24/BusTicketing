const express = require('express');
const router  = express.Router();
const Ticket = require('../models/ticket')
const mongoose = require('mongoose');

//-----Base Route ---------------------
router.get('/',(req,res,next) => {
    res.status(200).json({
        message:"Welcome to BusTicketing Service"
    })
});

module.exports = router;