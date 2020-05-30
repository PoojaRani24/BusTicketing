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

    // it('OK, Array size is same as total tickets with status true/close : ',(done) => {
    //     request('http://localhost:3000').post('/tickets/book')
    //     .send({status:'true',name:'close',src:'close',des:'close'})
    //     .then((res) => {
    //         request('http://localhost:3000').get('/tickets/close')
    //         .then((res) => {
    //             const body = res.body;
    //             const count =res.body.count
    //             //const ticketdetails =res.body.ticketdetails
    //             //  console.log(body)
    //             //  console.log(body.count)
    //              //console.log(body.tickets[0].status)
    //             expect(body.tickets.length).to.equal(count);
    //             done();
    //         })
    //     })
    //     .catch((err) => done(err));
    // })

    // it('OK, getting tickets with status true/close : ',(done) => {
    //     request('http://localhost:3000').post('/tickets/book')
    //     .send({status:'false',name:'close',src:'close',des:'close'})
    //     .then((res) => {
    //         request('http://localhost:3000').get('/tickets/close')
    //         .then((res) => {
    //             const body = res.body;
    //            // const count =res.body.count
    //             //const ticketdetails =res.body.ticketdetails
    //             //  console.log(body)
    //             //  console.log(body.count)
    //              expect(body.tickets[0].status).to.equal(true);
    //             //expect(body.tickets.length).to.equal(count);
    //             done();
    //         })
    //     })
    //     .catch((err) => done(err));
    // })
   
    // it('fail, Incorrect endpoint : ',(done) => {
    //     request('http://localhost:3000').post('/tickets/book')
    //     .send({status:'false',name:'Incorrect endpoint',src:'Incorrect endpoint',des:'Incorrect endpoint'})
    //     .then((res) => {
    //         request('http://localhost:3000').get('/tickets/closed')
    //         .then((res) => {
    //         //console.log(res)
    //         const body = res.body;
    //          //console.log(body)
    //          //console.log(body.error.message)
    //           expect(res.status).to.equal(500);
    //         expect(body).to.contain.property('error');
    //             done();
    //         })
    //     })
    //     .catch((err) => done(err));
    // })
    
})