process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const moment = require('moment');
const { PREFIX } = require('../server/config');
const { Passport } = require('../server/models');
const { DATE_FORMAT } = require('../server/config');
const { passportsMock } = require('./mocks');

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

  describe('GET /passports', () => {
    it('it should GET status code 200', (done) => {
      chai.request(app)
        .get(`/${PREFIX}/passports`)
        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });

    it('it should GET a array', (done) => {
      chai.request(app)
        .get(`/${PREFIX}/passports`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');

          done();
        });
    });
  });

  describe('POST /passports', () => {
    it('it should POST a user', (done) => {
      const passport = Object.assign({}, passportsMock[0]);

      chai.request(app)
        .post(`/${PREFIX}/passports`)
        .send(passport)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('issueDate');
          res.body.should.have.property('expiryDate');
          res.body.should.have.property('passportNumber');
          res.body.should.have.property('identificationNumber');
          res.body.should.have.property('authority');

          done();
        });
    });
  });

  describe('PUT /passports', () => {
    it('it should update user', (done) => {
      const passport = Object.assign({}, passportsMock[0]);
      const issueDate = moment(passport.issueDate, DATE_FORMAT, true).unix();
      const expiryDate = moment(passport.expiryDate, DATE_FORMAT, true).unix();

      chai.request(app)
        .post(`/${PREFIX}/passports`)
        .send(passport)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.issueDate.should.be.a('number');
          res.body.issueDate.should.equal(issueDate);
          res.body.expiryDate.should.be.a('number');
          res.body.expiryDate.should.equal(expiryDate);
          res.body.passportNumber.should.equal('AB1111111');
          res.body.identificationNumber.should.equal('2020286BI');
          res.body.authority.should.be.a('string');

          passport.id = res.body.id;
          passport.passportNumber = 'AB1111112';

          chai.request(app)
            .put(`/${PREFIX}/passports`)
            .send(passport)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.issueDate.should.be.a('number');
              response.body.issueDate.should.equal(issueDate);
              response.body.expiryDate.should.be.a('number');
              response.body.expiryDate.should.equal(expiryDate);
              response.body.passportNumber.should.equal('AB1111112');
              response.body.identificationNumber.should.equal('2020286BI');
              response.body.authority.should.be.a('string');

              done();
            });
        });

    });
  });

  describe('DELETE /passport', () => {
    it('it should delete passport', (done) => {
      const passport = Object.assign({}, passportsMock[0]);
      const issueDate = moment(passport.issueDate, DATE_FORMAT, true).unix();
      const expiryDate = moment(passport.expiryDate, DATE_FORMAT, true).unix();

      chai.request(app)
        .post(`/${PREFIX}/passports`)
        .send(passport)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.issueDate.should.be.a('number');
          res.body.issueDate.should.equal(issueDate);
          res.body.expiryDate.should.be.a('number');
          res.body.expiryDate.should.equal(expiryDate);
          res.body.passportNumber.should.equal('AB1111111');
          res.body.identificationNumber.should.equal('2020286BI');
          res.body.authority.should.be.a('string');

          passport.id = res.body.id;

          chai.request(app)
            .delete(`/${PREFIX}/passports`)
            .send(passport)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.should.have.property('message');

              done();
            });
        });
    });
  });
});