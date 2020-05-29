const expect = require('chai').expect;
const request = require('supertest');
const mongoose   = require('mongoose');

const app = require('../../../app.js');
const conn = require('../../../db/index.js');

describe('POST /tickets/book',() => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((err) => done(err));
    })
    
    // before((done) => {
    //     const Mockgoose = require('mockgoose').Mockgoose;
    //     const mockgoose = new Mockgoose(mongoose);
    //     mockgoose.prepareStorage()
    //     .then(() => {
    //     //------------------------
    //       mongoose.connect(
    //        'mongodb+srv://bus-ticketing:'+
    //        'bus-ticketing'+
    //        '@cluster0-9ksoe.mongodb.net/test?retryWrites=true&w=majority',
    //        {
    //         useNewUrlParser: true,
    //         useCreateIndex: true,
    //         useUnifiedTopology: true,
    //         promiseLibrary: global.Promise
    //       }
    //     )
    //     .then(() => done())
    //     .catch((err) => done(err));
    //    //------------------------------
    //    })
    //     .then(() => done())
    //     .catch((err) => done(err));
    // })

    // before((done) => {
    //     //------------------------
    //    mongoose.connect(
    //     'mongodb+srv://bus-ticketing:'+
    //     'bus-ticketing'+
    //       '@cluster0-9ksoe.mongodb.net/test?retryWrites=true&w=majority',
    //      {
    //         useNewUrlParser: true,
    //         useCreateIndex: true,
    //         useUnifiedTopology: true,
    //         promiseLibrary: global.Promise
    //      }
    //   )
    //   //------------------------------
    //      .then(() => done())
    //      .catch((err) => done(err));
    // })

    after((done) => {
        // conn.close()
        mongoose.disconnect()
       .then(() => done())
       .catch((err) => done(err));
    })

    it('OK, creating new ticket ',(done) => {
        request('http://localhost:3000').post('/tickets/book')
        .send({status:'false',name:'test',src:'test',des:'test'})
        .then((res) => {
            const body = res.body;
            const ticketdetails =res.body.ticketdetails
            // console.log(body)
            // console.log(ticketdetails)
            // console.log(body.ticketdetails._id)
            expect(body).to.contain.property('message');
            expect(body).to.contain.property('ticketdetails');
            expect(ticketdetails).to.contain.property('_id');
            expect(ticketdetails).to.contain.property('status');
            expect(ticketdetails).to.contain.property('name');
            expect(ticketdetails).to.contain.property('src');
            expect(ticketdetails).to.contain.property('des');
            done();
        })
        .catch((err) => done(err));
    })

})