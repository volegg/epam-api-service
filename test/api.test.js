process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const { PREFIX } = require('../server/config');

chai.use(chaiHttp);

describe('API', () => {
  beforeEach((done) => { //Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });

  describe('GET /api', () => {
    it('it should GET status code 200 with message', (done) => {
      chai.request(app)
        .get(`/${PREFIX}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');

          done();
        });
    });

    it('it should GET status code 200 with property errors', (done) => {
      chai.request(app)
        .get(`/${PREFIX}/error`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('errors');

          done();
        });
    });
  });
});

