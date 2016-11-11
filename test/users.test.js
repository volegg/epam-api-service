process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const { PREFIX } = require('../server/config');

const User = require('../server/models/user.model');

chai.use(chaiHttp);


describe('USER API', () => {
  beforeEach((done) => { //Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });

  describe('GET /users', () => {
    it('it should GET status code 200', (done) => {
      chai.request(app)
        .get(`/${PREFIX}/users`)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it should GET array', (done) => {
      chai.request(app)
        .get(`/${PREFIX}/users`)
        .end((err, res) => {
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('POST /users', () => {
    it('it should POST a user', (done) => {
      const user = {
        name: 'vlad',
        surname: 'kovaliov',
        sex: 'male',
        birthday: '02/05/1993',
        issueDate: '09/12/2000',
        expiryDate: '05/12/2015',
        identificationNumber: '2222233PV',
        authority: 'some text',
        passportNumber: 'AB2222222',
        country: 'BLR'
      };

      chai.request(app)
        .post(`/${PREFIX}/users`)
        .send(user)
        .end((err, res) => {
          res.body.should.be.a('object');
          done();
        });
    });
  });
});

