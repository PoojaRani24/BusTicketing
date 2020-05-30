const expect = require('chai').expect;
const request = require('supertest');
const mongoose   = require('mongoose');

const app = require('../../../../app.js');
const conn = require('../../../../db/index.js');

describe('GET /tickets/:ticketId/details',() => {
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

    it('OK, geting details of ticket ',(done) => {
        request('http://localhost:3000').post('/tickets/book')
        .send({status:'true',name:'ticket details',src:'ticket details',des:'ticket details'})
        .then((res) => {
               const body=res.body;
              // console.log(body)
               const id= body.ticketdetails._id
            //    console.log(id)
             request('http://localhost:3000').get('/tickets/'+id+'/details')
             .then((res) => {
                 const tic = res.body;
                   //console.log(tic)
                   expect(tic).to.contain.property('_id')
                   expect(tic).to.contain.property('status');
                   expect(tic).to.contain.property('name');
                   expect(tic).to.contain.property('src');
                   expect(tic).to.contain.property('des');
                done();
            })
        })
        .catch((err) => done(err));
    })

    it('OK, geting details of ticket  ',(done) => {
        request('http://localhost:3000').post('/tickets/book')
        .send({status:'false',name:'ticket details',src:'ticket details',des:'ticket details'})
        .then((res) => {
               const body=res.body;
              // console.log(body)
               const id= body.ticketdetails._id
            //    console.log(id)
             request('http://localhost:3000').get('/tickets/'+id+'/details')
             .then((res) => {
                 const tic = res.body;
                   //console.log(tic)
                    expect(tic).to.contain.property('message')
                //    expect(tic).to.contain.property('status');
                //    expect(tic).to.contain.property('name');
                //    expect(tic).to.contain.property('src');
                //    expect(tic).to.contain.property('des');
                done();
            })
        })
        .catch((err) => done(err));
    })

    it('fail, Incorrect endpoint  ',(done) => {
        request('http://localhost:3000').post('/tickets/book')
        .send({status:'false',name:'Incorrect endpoint',src:'Incorrect endpoint',des:'Incorrect endpoint'})
        .then((res) => {
            const body=res.body;
            const id= body.ticketdetails._id
            request('http://localhost:3000').get('/tickets/'+id+'/ticketdetails')
            .then((res) => {
            //console.log(res.status)
            const body = res.body;
             //console.log(body)
             //console.log(body.error.message)
            expect(res.status).to.equal(404);
            expect(body).to.contain.property('error');
                done();
            })
        })
        .catch((err) => done(err));
    })

})