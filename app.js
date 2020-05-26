const express = require('express');
const app = express();

const ticketRoutes = require('./api/routes/tickets');

app.use('/tickets',ticketRoutes);

// app.use((req,res,next) => {
//     res.status(200).json({
//         message:"It works !"
//     });
// });

module.exports = app;