const express = require('express');
const router = express.Router();
const { passportService } = require('../services');
const moment = require('moment');
const { DATE_FORMAT } = require('../config');
const { isPassportValid, isRequestValid } = require('../shared/validators/request.validator');

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

router.post('/', (req, res, next) => {
  const { errors, isValid } = isPassportValid(req.body);

  if (!isValid) {
    next(errors);
    return;
  }

  passportService.getPassportByidentificationNumber(req.body.identificationNumber)
    .then((passport) => {
      if (passport) {
        next({
          errors: {
            message: `The passport with id \'${req.body.identificationNumber}\' already exist.`
          }
        });
        return;
      }

      passportService.insertPassport(req.body)
        .then((passport) => {
          const passportResult = {
            id: passport._id,
            passportNumber: passport.passportNumber,
            identificationNumber: passport.identificationNumber,
            issueDate: passport.issueDate,
            expiryDate: passport.expiryDate,
            authority: passport.authority
          }

          res.status(200).json(passportResult);
        });
    });
});

router.put('/', (req, res, next) => {
  const { errors, isValid } = isPassportValid(req.body);

  if (!isValid) {
    next(errors);
    return;
  }

  passportService.getPassportById(req.body.id)
    .then((passport) => {
      passport.passportNumber = req.body.passportNumber;
      passport.identificationNumber = req.body.identificationNumber;
      passport.issueDate = req.body.issueDate;
      passport.expiryDate = req.body.expiryDate;
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
    })
    .catch((err) => {
      next({
        errors: {
          message: `The passport with id \'${req.body.id}\' doesn't exist.`
        }
      });
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


router.delete('/', (req, res, next) => {
  const { errors, isValid } = isPassportValid(req.body);

  if (!isValid) {
    next(errors);
    return;
  }

  passportService.deletePassport(req.body)
    .then((passport) => {
      res.status(200).json({
        message: 'The passport deleted successfully'
      });
    })
    .catch((err) => {
      next({
        errors: {
          message: `The passport with id \'${req.body.id}\' doesn't exist.`
        }
      });
    });
});

module.exports = router;
