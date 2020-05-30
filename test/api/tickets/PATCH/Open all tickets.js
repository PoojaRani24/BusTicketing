const expect = require('chai').expect;
const request = require('supertest');
const mongoose   = require('mongoose');

const app = require('../../../../app.js');
const conn = require('../../../../db/index.js');

describe('PATCH /admin/open',() => {
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
        .send({status:'true',name:'name',src:'src',des:'des'})
        .then((res) => {
               const body=res.body;
              // console.log(body)
               const id= body.ticketdetails._id
            //    console.log(id)
            //console.log(body)
             request('http://localhost:3000').patch('/tickets/'+id+'/update')
              .send([{"propName":"status","value":"false"},{"propName":"name","value":"updated name"},{"propName":"src","value":"updated src"},{"propName":"des","value":"updated des"}])
              .then((result) => {
                  console.log(result)
                 expect(result.nmodified).to.equal(1);
              })
                done();
            })
        .catch((err) => done(err));
    })

})
