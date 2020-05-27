const express = require('express');
const app = express();

const ticketRoutes = require('./api/routes/tickets');
const adminRoutes  = require('./api/routes/admin');

app.use('/tickets',ticketRoutes);

app.use('/admin',adminRoutes);

// app.use((req,res,next) => {
//     res.status(200).json({
//         message:"It works !"
//     });
// });

module.exports = app;