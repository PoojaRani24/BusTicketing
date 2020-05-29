const expect = require('chai').expect;
const request = require('supertest');
const mongoose   = require('mongoose');

const app = require('../../../app.js');
const conn = require('../../../db/index.js');

describe('POST /tickets/book',() => {
    before((done) => {
       //this.timeout(12000);
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
         .then(() => done())
         .catch((err) => done(err));
    })

    after((done) => {
        // conn.close()
        mongoose.disconnect()
       .then(() => done())
       .catch((err) => done(err));
    })

    it('OK, creating new ticket ',(done) => {
        request('http://localhost:3000').post('/tickets/book')
        .send({name:'test',src:'test',des:'test'})
        .then((res) => {
            const body = res.body;
            expect(body).to.contain.property(_id);
            expect(body).to.contain.property('name');
            expect(body).to.contain.property('src');
            expect(body).to.contain.property('des');
            done();
        })
        .catch((err) => done(err));
        //done()
    })

})