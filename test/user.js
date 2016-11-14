'use strict';
const mongoose = require('mongoose');
const User = require('../Server/models/User.js');
const Passport = require('../Server/models/Passport.js');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../Server/main.js');
const should = chai.should();

const userData1 = {
    name: 'John',
    surname: 'Doe',
    birthday: '11/10/1989',
    issueDate: '01/02/2011',
    expiryDate: '11/10/2019',
    country: 'RUS',
    photo: '',
    sex: 'male',
    passportNumber: 'AB12345678',
    identificationNumber: '2123456PB',
    authority: 'qwerty'
};

const userData2 = {
    name: 'Jonny',
    surname: 'Doeee',
    birthday: '11/10/1989',
    issueDate: '01/02/2001',
    expiryDate: '11/10/2009',
    country: 'BLR',
    photo: '',
    sex: 'female',
    passportNumber: 'AB12345678',
    identificationNumber: '3123456GB',
    authority: 'ytrewq'
};

const userData3 = {
    name: 'Nhoj',
    surname: 'Eod',
    birthday: '11/10/2011',
    issueDate: '01/02/2012',
    expiryDate: '11/10/2029',
    country: 'GBR',
    photo: '',
    sex: 'male',
    passportNumber: 'AB12345678',
    identificationNumber: '2654321GB',
    authority: 'qwertyuiop'
};

chai.use(chaiHttp);
describe('Users', () => {
    before((done) => {
        User.remove({}, (err) => {
            done();
        });
    });
    let id;
    describe('/POST user', () => {
        it('it should POST an user', (done) => {
            let user = Object.assign({}, userData1);
            chai.request(server)
                .post('/user')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    id = res.body.id;
                    done();
                });
        });
    });
    describe('/GET requests', () => {
        it('it should GET all users', (done) => {
            let user = Object.assign({}, userData2);
            chai.request(server)
                .post('/user')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    chai.request(server)
                        .get('/user')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.equals(2);
                        });
                    done();
                });
        });
        it('it should GET user by id', (done) => {
            chai.request(server)
                .get('/user/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.name.should.be.equals('John');
                    res.body.country.should.be.equals('RUS');
                    done();
                });
        });
    });

    describe('/DELETE user', () => {
        it('it should DELETE an user by id', (done) => {
            chai.request(server)
                .delete('/user/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.name.should.be.equals('John');
                    done();
                });
        });
    });

    describe('/PUT user', () => {
        it('it should UPDATE an user by id', (done) => {
            let user = Object.assign({}, userData3);
            let newUserData = {
                name: "test put"
            };
            let newUser = Object.assign({}, newUserData);
            chai.request(server)
                .post('/user')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    let newId = res.body.id;
                    chai.request(server)
                        .put('/user/' + newId)
                        .send(newUser)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.name.should.be.equals('test put');
                        });
                    done();
                });
        });
    });

});
