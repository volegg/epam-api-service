process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const moment = require('moment');
const { PREFIX } = require('../server/config');
const { User, Passport } = require('../server/models');
const { usersMock } = require('./mocks');
const { DATE_FORMAT } = require('../server/config');

chai.use(chaiHttp);

describe('USER API', () => {
  beforeEach((done) => {
    Passport.remove({})
      .then((data) => {
        User.remove({})
          .then((data) => {
            done();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

  });

  afterEach((done) => {
    Passport.remove({})
      .then((data) => {
        User.remove({})
          .then((data) => {
            done();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
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

    it('it should GET a array', (done) => {
      chai.request(app)
        .get(`/${PREFIX}/users`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');

          done();
        });
    });
  });

  describe('POST /users', () => {
    it('it should POST a user', (done) => {
      const user = Object.assign({}, usersMock[0]);

      chai.request(app)
        .post(`/${PREFIX}/users`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('surname');
          res.body.should.have.property('sex');
          res.body.should.have.property('birthday');
          res.body.should.have.property('country');

          done();
        });
    });
  });

  describe('PUT /users', () => {
    it('it should update user', (done) => {
      const user = Object.assign({}, usersMock[0]);
      const birthday = moment(user.birthday, DATE_FORMAT, true).unix();

      chai.request(app)
        .post(`/${PREFIX}/users`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.name.should.equal('vlad');
          res.body.surname.should.equal('kovaliov');
          res.body.birthday.should.be.a('number');
          res.body.birthday.should.equal(birthday);
          res.body.sex.should.be.a('number');
          res.body.sex.should.equal(2);

          user.id = res.body.id;
          user.name = 'ivan';

          chai.request(app)
            .put(`/${PREFIX}/users`)
            .send(user)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.id.should.equal(res.body.id);
              response.body.name.should.equal('ivan');
              response.body.surname.should.equal('kovaliov');
              response.body.birthday.should.be.a('number');
              response.body.birthday.should.equal(birthday);
              response.body.sex.should.be.a('number');
              response.body.sex.should.equal(2);

              done();
            });
        });
    });
  });

  describe('DELETE /user', () => {
    it('it should delete user', (done) => {
      const user = Object.assign({}, usersMock[0]);
      const birthday = moment(user.birthday, DATE_FORMAT, true).unix();

      chai.request(app)
        .post(`/${PREFIX}/users`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.name.should.equal('vlad');
          res.body.surname.should.equal('kovaliov');
          res.body.birthday.should.be.a('number');
          res.body.birthday.should.equal(birthday);
          res.body.sex.should.be.a('number');
          res.body.sex.should.equal(2);

          user.id = res.body.id;

          chai.request(app)
            .delete(`/${PREFIX}/users`)
            .send(user)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.should.have.property('message');

              done();
            });
        });
    });
  });
});
