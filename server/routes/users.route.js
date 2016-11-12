const express = require('express');
const router = express.Router();
const { passportService, userService } = require('../services');
const moment = require('moment');
const { DATE_FORMAT } = require('../config');
const sex = require('../models/types/sex.type.js');

router.post('/', (req, res, next) => {
  passportService.insertPassport({
      passportNumber: req.body.passportNumber,
      identificationNumber: req.body.identificationNumber,
      issueDate: moment(req.body.issueDate, DATE_FORMAT, true).unix(),
      expiryDate: moment(req.body.expiryDate, DATE_FORMAT, true).unix(),
      authority: req.body.authority
    })
    .then((passport) => {
      userService.insertUser({
        name: req.body.name,
        surname: req.body.surname,
        birthday: moment(req.body.birthday, DATE_FORMAT, true).unix(),
        sex: sex[req.body.sex],
        photo: req.body.photo,
        country: req.body.country,
        passportId: passport._id
      })
        .then((user) => {
          const userResult = {
            id: user._id,
            name: user.name,
            surname: user.surname,
            birthday: user.birthday,
            sex: user.sex,
            phone: user.photo,
            country: user.country
          };

          res.status(200).json(userResult);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  if (req.params.id) {
    userService.getUserById(req.params.id)
      .then((user) => {
        if (!user) {
          res.status(200).json({});
        }

        const userResult = {
          id: user._id,
          name: user.name,
          surname: user.surname,
          birthday: user.birthday,
          sex: user.sex,
          phone: user.photo,
          country: user.country
        };

        res.status(200).json(userResult);
      })
      .catch((err) => {
        next(err);
      });
  }
});

router.get('/', (req, res, next) => {
  userService.getUsers()
    .then((users) => {
      if (!users) {
        res.status(200).json({});
      }

      const usersResult = users.map((user) => {
        return {
          id: user._id,
          name: user.name,
          surname: user.surname,
          birthday: user.birthday,
          sex: user.sex,
          phone: user.photo,
          country: user.country
        };
      });

      res.status(200).json(usersResult);
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/', (req, res, next) => {
  userService.updateUser(req.body.id)
    .then((user) => {
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.birthday = moment(req.body.birthday, DATE_FORMAT, true).unix();
      user.sex = sex[req.body.sex];
      user.photo = req.body.photo;
      user.country = req.body.country;

      user.save()
        .then((user) => {
          const userResult = {
            id: user._id,
            name: user.name,
            surname: user.surname,
            birthday: user.birthday,
            sex: user.sex,
            phone: user.photo,
            country: user.country
          };

          res.status(200).json(userResult);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/', (req, res, next) => {
  userService.deleteUser(req.body)
    .then((user) => {
      res.status(200).json({
        message: 'The user deleted successfully'
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
