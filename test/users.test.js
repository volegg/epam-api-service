process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
const moment = require('moment');
const { PREFIX } = require('../server/config');
const { User, Passport } = require('../server/models');
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
          });
      })
      .catch((err) => {
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
          });
      })
      .catch((err) => {
      });
  });

 it('should list ALL users on /users GET', (done) => {
   chai.request(app)
     .get('/api/users')
     .end(function(err, res) {
       res.should.have.status(200);
       res.should.be.json;
       res.body.should.be.a('array');
       done();
     });
 });

 it('should list a SINGLE user on /user/<id> GET', (done) => {
   const server = chai.request(app);
   server
     .post('/api/users')
     .send(
       {
         name: 'vlad',
         surname: 'kovaliov',
         birthday: '01/01/2310',
         issueDate: '03/02/2310',
         expiryDate: '01/02/2031',
         country: 'BLR',
         photo: '',
         sex: 'male',
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
       res.body.should.have.property('name');
       res.body.should.have.property('surname');
       res.body.should.have.property('birthday');
       res.body.should.have.property('sex');
       res.body.should.have.property('country');

      server
        .get('/api/users/' + res.body.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('name');
          res.body.should.have.property('surname');
          res.body.should.have.property('birthday');
          res.body.should.have.property('sex');
          res.body.should.have.property('country');

          done();
        });
     });
 });

 it('should add a SINGLE user on /users POST', (done) => {
   chai.request(app)
     .post('/api/users')
     .send(
       {
         name: 'vlad',
         surname: 'kovaliov',
         birthday: '01/01/2310',
         issueDate: '03/02/2310',
         expiryDate: '01/02/2031',
         country: 'BLR',
         photo: '',
         sex: 'male',
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
       res.body.should.have.property('name');
       res.body.should.have.property('surname');
       res.body.should.have.property('birthday');
       res.body.should.have.property('sex');
       res.body.should.have.property('country');
       done();
     });
 });

 it('should update a SINGLE user on /users PUT', (done) => {
   chai.request(app)
     .post('/api/users')
     .send(
       {
         name: 'vlad',
         surname: 'kovaliov',
         birthday: '01/01/2310',
         issueDate: '03/02/2310',
         expiryDate: '01/02/2031',
         country: 'BLR',
         photo: '',
         sex: 'male',
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
       res.body.should.have.property('name');
       res.body.should.have.property('surname');
       res.body.should.have.property('birthday');
       res.body.should.have.property('sex');
       res.body.should.have.property('country');

       res.body.name = 'vladik';

       chai.request(app)
         .put('/api/users')
         .send(res.body)
         .end((err, passport) => {
           res.should.have.status(200);
           res.should.be.json;
           res.body.should.be.a('object');
           res.body.should.have.property('id');
           res.body.should.have.property('name');
           res.body.name.should.be.equal('vladik');
           res.body.should.have.property('surname');
           res.body.should.have.property('birthday');
           res.body.should.have.property('sex');
           res.body.should.have.property('country');
           done();
         });
       });
 });

 it('should delete a SINGLE user on /users DELETE', (done) => {
   const server = chai.request(app);
   const user =  {
      name: 'vlad',
      surname: 'kovaliov',
      birthday: '01/01/2310',
      issueDate: '03/02/2310',
      expiryDate: '01/02/2031',
      country: 'BLR',
      photo: '',
      sex: 'male',
      passportNumber: 'BA0234567',
      identificationNumber: '2020281GB',
      issueDate: '01/01/2015',
      expiryDate: '01/01/2016',
      authority: 'some text'
    };

   server
     .post('/api/users')
     .send(user)
     .end(function(err, res) {
       res.should.have.status(200);
       res.should.be.json;
       res.body.should.be.a('object');
       res.body.should.have.property('id');
       res.body.should.have.property('name');
       res.body.should.have.property('surname');
       res.body.should.have.property('birthday');
       res.body.should.have.property('sex');
       res.body.should.have.property('country');
       user.id = res.body.id;
       server
         .delete('/api/users')
         .send(user)
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
