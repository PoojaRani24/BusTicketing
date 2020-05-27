const express = require('express');
const app     = express();
const morgan  = express('morgan');

const ticketRoutes = require('./api/routes/tickets');
const adminRoutes  = require('./api/routes/admin');

 //app.use(morgan('dev'));

//Routes that should handle request
app.use('/tickets',ticketRoutes);
app.use('/admin',adminRoutes);

//-------Error Handling------
app.use((req,res,next) =>{
    const error=new Error("Route Not Found !")
    error.status=404
    next(error)
});

app.use((error,req,res,next) => {
    res.status(error.status || 500);
    res.json({
            error:{
                message:error.message
            }
    });
});

module.exports = app;