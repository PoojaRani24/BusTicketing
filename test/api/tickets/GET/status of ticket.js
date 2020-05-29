const expect = require('chai').expect;
const request = require('supertest');
const mongoose   = require('mongoose');

const app = require('../../../../app.js');
const conn = require('../../../../db/index.js');

describe('GET /tickets/:ticketId/status',() => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((err) => done(err));
    })

    after((done) => {
        // conn.close()
        mongoose.disconnect()
       .then(() => done())
       .catch((err) => done(err));
    })

    it('OK, geting status of ticket : ',(done) => {
        request('http://localhost:3000').post('/tickets/book')
        .send({status:'false',name:'status',src:'status',des:'status'})
        .then((res) => {
               const body=res.body;
               console.log(body)
               const id= body.ticketdetails._id
               console.log(id)
             request('http://localhost:3000').get('/tickets/'+id+'/status')
             .then((res) => {
                 const tic = res.body;
                   console.log(tic.message)
                   //expect(tic.message)
                done();
            })
        })
        .catch((err) => done(err));
    })


})