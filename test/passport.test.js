process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const moment = require('moment');
const { PREFIX } = require('../server/config');
const { Passport } = require('../server/models');
const { DATE_FORMAT } = require('../server/config');

chai.use(chaiHttp);

describe('PASSPORT API', () => {
  beforeEach((done) => {
    Passport.remove({})
      .then((data) => {
        done();
      })
      .catch((err) => {
      });
  });

  afterEach((done) => {
    Passport.remove({})
      .then((data) => {
        done();
      })
      .catch((err) => {
      });
  });

  it('should list ALL passports on api/passports GET', (done) => {
    chai.request(app)
      .get('/api/passports')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });

  it('should add a SINGLE passport on api/passports POST', (done) => {
    chai.request(app)
      .post('/api/passports')
      .send(
        {
          passportNumber: 'BA0234567',
          identificationNumber: '2020281GB',
          issueDate: '01/01/2015',
          expiryDate: '01/01/2016',
          authority: 'some text'
        }
      )
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('passportNumber');
        res.body.should.have.property('identificationNumber');
        res.body.should.have.property('issueDate');
        res.body.should.have.property('expiryDate');
        res.body.should.have.property('authority');
        done();
      });
  });

  it('should update a SINGLE passport on api/passports PUT', (done) => {
    chai.request(app)
      .post('/api/passports')
      .send(
        {
          passportNumber: 'BA0234567',
          identificationNumber: '2020281GB',
          issueDate: '01/01/2015',
          expiryDate: '01/01/2016',
          authority: 'some text'
        }
      )
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('passportNumber');
        res.body.should.have.property('identificationNumber');
        res.body.should.have.property('issueDate');
        res.body.should.have.property('expiryDate');
        res.body.should.have.property('authority');

        res.body.passportNumber = 'AB0234567';

        chai.request(app)
          .put('/api/passports')
          .send(res.body)
          .end((err, passport) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('passportNumber');
            res.body.passportNumber.should.be.equal('AB0234567');
            res.body.should.have.property('identificationNumber');
            res.body.should.have.property('issueDate');
            res.body.should.have.property('expiryDate');
            res.body.should.have.property('authority');
            done();
          })
      });
  });

  it('should delete a SINGLE passport on api/passports DELETE', (done) => {
    const server = chai.request(app);
    server
      .post('/api/passports')
      .send(
        {
          passportNumber: 'BA0234567',
          identificationNumber: '2020281GB',
          issueDate: '01/01/2015',
          expiryDate: '01/01/2016',
          authority: 'some text'
        }
      )
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('passportNumber');
        res.body.should.have.property('identificationNumber');
        res.body.should.have.property('issueDate');
        res.body.should.have.property('expiryDate');
        res.body.should.have.property('authority');

        server
          .delete('/api/passports')
          .send(res.body)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('message');

            done();
          });
      });
  });
});
