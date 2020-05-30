const expect = require('chai').expect;
const request = require('supertest');
const mongoose   = require('mongoose');

const app = require('../../../../app.js');
const conn = require('../../../../db/index.js');

describe('GET /tickets/close',() => {
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

    //  it('OK, updating status of a ticket : ',(done) => {
    //     request('http://localhost:3000').post('/tickets/book')
    //     .send({status:'true',name:'update status',src:'update status',des:'update status'})
    //     .then((res) => {
    //            const body=res.body;
    //           // console.log(body)
    //            const id= body.ticketdetails._id
    //         //    console.log(id)
    //          request('http://localhost:3000').patch('/tickets/'+id+'/update')
    //          .then((res) => {
    //              const tic = res.body;
    //             //    console.log(tic.message)
    //                expect(tic.message).to.equal('Your ticket is Booked')
    //             done();
    //         })
    //     })
    //     .catch((err) => done(err));
    // })

})