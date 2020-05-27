const express = require('express');
const router  = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message : "Handling GET Request to /tickets"
    });
});

router.post('/',(req,res,next) => {
    res.status(200).json({
        message : "Handling POST Request to /tickets"
    });
});

router.get('/:ticketId',(req,res,next) =>{
    const id = req.params.ticketId;
    if(id === 'special'){
        res.status(200).json({
            message :'You discovered the special Id',
            Id:id
        });
    }
    else{
        res.status(200).json({
            message :'You passed an Id',
            Id : id
        });
    }
});

router.patch('/:ticketId',(req,res,next) => {
    res.status(200).json({
        message:"patch request is served"
    })
});

router.delete('/:ticketId',(req,res,next) => {
    res.status(200).json({
        message:"delete request is served"
    })
});

module.exports = router;