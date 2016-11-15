const express = require('express');
const router = express.Router();
const { passportService } = require('../services');
const moment = require('moment');
const { DATE_FORMAT } = require('../config');
const { Passport } = require('../models');

router.post('/', (req, res, next) => {
  passportService.insertPassport({
      passportNumber: req.body.passportNumber,
      identificationNumber: req.body.identificationNumber,
      issueDate: moment(req.body.issueDate, DATE_FORMAT, true).unix(),
      expiryDate: moment(req.body.expiryDate, DATE_FORMAT, true).unix(),
      authority: req.body.authority
    })
    .then((passport) => {
      const passportResult = {
        id: passport._id,
        passportNumber: passport.passportNumber,
        identificationNumber: passport.identificationNumber,
        issueDate: passport.issueDate,
        expiryDate: passport.expiryDate,
        authority: passport.authority
      };

      res.status(200).json(passportResult);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:surname', (req, res, next) => {
  if (req.params.surname) {
    passportService.getPassportBySurname(req.params.surname)
      .populate('_passport')
      .exec((err, user) => {
        if (err) { next(err); }

        if (!user) {
          next(new Error('The passport data with surname \'user.surname\' not exist.'));
        } else {
          const passport = {
            id: user._passport._id,
            passportNumber: user._passport.passportNumber,
            identificationNumber: user._passport.identificationNumber,
            issueDate: user._passport.issueDate,
            expiryDate: user._passport.expiryDate,
            authority: user._passport.authority
          };

          res.status(200).json(passport);
        }
      });
  }
});

router.get('/', (req, res, next) => {
  passportService.getPassports()
    .then((passports) => {
      if (!passports) {
        res.status(200).json({});
      }

      const passportsResult = passports.map((passport) => {
        return {
          id: passport._id,
          passportNumber: passport.passportNumber,
          identificationNumber: passport.identificationNumber,
          issueDate: passport.issueDate,
          expiryDate: passport.expiryDate,
          authority: passport.authority
        };
      });

      res.status(200).json(passportsResult);
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/', (req, res, next) => {
  passportService.updatePassport(req.body.id)
    .then((passport) => {
      passport.passportNumber = req.body.passportNumber;
      passport.identificationNumber = req.body.identificationNumber;
      passport.issueDate = moment(req.body.issueDate, DATE_FORMAT, true).unix();
      passport.expiryDate = moment(req.body.expiryDate, DATE_FORMAT, true).unix();
      passport.authority = req.body.authority;

      passport.save()
        .then((passport) => {
          const passportResult = {
            id: passport._id,
            passportNumber: passport.passportNumber,
            identificationNumber: passport.identificationNumber,
            issueDate: passport.issueDate,
            expiryDate: passport.expiryDate,
            authority: passport.authority
          };

          res.status(200).json(passportResult);
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
  passportService.deletePassport(req.body)
    .then((passport) => {
      res.status(200).json({
        message: 'The passport deleted successfully'
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
