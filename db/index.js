const mongoose = require('mongoose');

function connect(){
    return new Promise((resolve,reject) => {
        mongoose.connect(
            'mongodb+srv://bus-ticketing:'+
            'bus-ticketing'+
              '@cluster0-9ksoe.mongodb.net/test?retryWrites=true&w=majority',
             {
                useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            promiseLibrary: global.Promise
             }
          )
        .then((res,err) => {
            if(err) return reject(err);
            resolve();
        })
    })
}

// function connect(){
//     return new Promise((resolve,reject) => {
//         mongoose.connect(
//             'mongodb+srv://bus-ticketing:'+
//             'bus-ticketing'+
//               '@cluster0-9ksoe.mongodb.net/test?retryWrites=true&w=majority',
//              {
//                 useNewUrlParser: true,
//             useCreateIndex: true,
//             useUnifiedTopology: true,
//             promiseLibrary: global.Promise
//              }
//           )
//         .then((res,err) => {
//             if(err) return reject(err);
//             resolve();
//         })
//     })
// }

function close(){
    return mongoose.disconnect();
}

module.exports = { connect, close };