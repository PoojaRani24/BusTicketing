const expect = require('chai').expect;
const request = require('supertest');
const mongoose   = require('mongoose');

const app = require('../../../../app.js');
const conn = require('../../../../db/index.js');

describe('PATCH /admin',() => {
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

     it('OK, open all tickets : ',(done) => {
        request('http://localhost:3000').post('/tickets/book')
        .send({status:'true',name:'admin',src:'admin',des:'admin'})
        .then((res) => {
               const body=res.body;
               const id= body.ticketdetails._id
             request('http://localhost:3000').patch('/admin')
              .send([{"propName":"status","value":"false"}])
              .then((result) => {
                  console.log(result)
                 expect(result.nmodified).to.not.equal(0);
              })
                done();
            })
        .catch((err) => done(err));
    })
})
