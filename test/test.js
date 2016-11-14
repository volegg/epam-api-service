'use strict';
const mongoose = require('mongoose');
const User = require('../Server/models/User.js');
const Passport = require('../Server/models/Passport.js');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../Server/main.js');
const should = chai.should();
const userData = require('./user.data.js');

chai.use(chaiHttp);
describe('Users', () => {
    before((done) => {
        User.remove({}, (err) => {
            Passport.remove({}, (err) => {});
            done();
        });
    });
    let id;
    describe('/POST requests', () => {
        it('it should POST user', (done) => {
            let user = Object.assign({}, userData[0]);
            chai.request(server).post('/user').send(user).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                id = res.body.id;
                done();
            });
        });
        it('it shouldn\'t POST user (validation error)', (done) => {
            let user = Object.assign({}, userData[3]);
            chai.request(server).post('/user').send(user).end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
    });
    describe('/GET requests', () => {
        it('it should GET all users', (done) => {
            let user = Object.assign({}, userData[1]);
            chai.request(server).post('/user').send(user).end((err, res) => {
                res.should.have.status(200);
                chai.request(server).get('/user').end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.equals(2);
                });
                done();
            });
        });
        it('it should GET user by id', (done) => {
            chai.request(server).get('/user/' + id).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.name.should.be.equals('John');
                res.body.country.should.be.equals('RUS');
                done();
            });
        });
        it('it shouldn\'t GET user by id (id not exist)', (done) => {
            chai.request(server).get('/user/' + null).end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
    });

    describe('/DELETE requests', () => {
        it('it should DELETE user by id', (done) => {
            chai.request(server).delete('/user/' + id).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.name.should.be.equals('John');
                done();
            });
        });
        it('it shouldn\'t DELETE user by id (deleted before)', (done) => {
            chai.request(server).delete('/user/' + id).end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
    });

    describe('/PUT requests', () => {
        it('it should UPDATE user by id', (done) => {
            let user = Object.assign({}, userData[2]);
            let newUserData = {
                name: "test put"
            };
            let newUser = Object.assign({}, newUserData);
            chai.request(server).post('/user').send(user).end((err, res) => {
                res.should.have.status(200);
                let newId = res.body.id;
                chai.request(server).put('/user/' + newId).send(newUser).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.name.should.be.equals('test put');
                });
                done();
            });
        });
        it('it shouldn\'t UPDATE user by id (id not exist)', (done) => {
            chai.request(server).put('/user/' + null).send({}).end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
    });
});
describe('Passports', () => {
    describe('/GET requests', () => {
        it('it should GET all passports', (done) => {
            chai.request(server).get('/passport').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            });
            done();
        });
    });
    describe('/PUT requests', () => {
        it('it shouldn\'t UPDATE passport by id (id not exist)', (done) => {
            chai.request(server).put('/passport/' + null).send({}).end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
        it('it should UPDATE passport by id', (done) => {
            let user = Object.assign({}, userData[2]);
            let newPassportData = {
                passportNumber: "BB87171711"
            };
            let newPassport = Object.assign({}, newPassportData);
            chai.request(server).post('/user').send(user).end((err, res) => {
                res.should.have.status(200);
                let newId = res.body.passportId;
                chai.request(server).put('/passport/' + newId).send(newPassport).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.passportNumber.should.be.equals('BB87171711');
                });
                done();
            });
        });
    });
});
