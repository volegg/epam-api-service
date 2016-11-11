process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const { PREFIX } = require('../server/config');

const User = require('../server/models/user.model');

chai.use(chaiHttp);


describe('API', () => {
  beforeEach((done) => { //Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });

  describe('GET /api', () => {
    it('it should GET status code 200', (done) => {
      chai.request(app)
        .get(`/${PREFIX}`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

