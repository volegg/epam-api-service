const { User, Passport } = require('../../models');
const { DATE_FORMAT } = require('../../config');
const moment = require('moment');
const { isSexValid } = require('./user.validator');
const sex = require('../../models/types/sex.type');

module.exports = {
  isPassportValid: function(data) {
    let errors = {};

    const isIssueDateValid = moment(data.issueDate, DATE_FORMAT, true).isValid();
    if (data.issueDate && isIssueDateValid) {
      data.issueDate = moment(data.issueDate, DATE_FORMAT, true).unix();
    }

    const isExpiryDateValid = moment(data.expiryDate, DATE_FORMAT, true).isValid();
    if (data.expiryDate && isExpiryDateValid) {
      data.expiryDate = moment(data.expiryDate, DATE_FORMAT, true).unix();
    }

    const passport = new Passport(data);

    const passportValidationErrors = passport.validateSync();

    if (passportValidationErrors && Object.keys(passportValidationErrors.errors).length) {
      for (let prop in passportValidationErrors.errors) {
        errors[prop] = passportValidationErrors.errors[prop].message;
      }
    }

    const valid = Object.keys(errors).length === 0 ? true : false;

    return {
      errors,
      isValid: valid
    };

  },
  isUserValid: function(data) {
    let errors = {};

    const isBirthDayValid = moment(data.birthday, DATE_FORMAT, true).isValid();
    if (data.birthday && isBirthDayValid) {
      data.birthday = moment(data.birthday, DATE_FORMAT, true).unix();
    } else {
      errors.birthday = `The birthday is not valid. The format must be (MM/DD/YYYY | MM-DD-YYYY)`;
    }

    const isIssueDateValid = moment(data.issueDate, DATE_FORMAT, true).isValid()
    if (data.issueDate && isIssueDateValid) {
        data.issueDate = moment(data.issueDate, DATE_FORMAT, true).unix();
    } else {
      errors.issueDate = `The issueDate is not valid. The format must be (MM/DD/YYYY | MM-DD-YYYY)`;
    }

    const isExpiryDateValid = moment(data.expiryDate, DATE_FORMAT, true).isValid()
    if (data.expiryDate && isExpiryDateValid) {
        data.expiryDate = moment(data.expiryDate, DATE_FORMAT, true).unix();
    } else {
      errors.expiryDate = `The expiryDate is not valid. The format must be (MM/DD/YYYY | MM-DD-YYYY)`;
    }

    if (sex[data.sex]) {
      data.sex = sex[data.sex];
    } else {
      errors.sex = `The sex is not valid. The format must be (male or female)`;
    }

    const passport = new Passport(data);
    const user = new User(data);

    const userValidationErrors = user.validateSync();
    const passportValidationErrors = passport.validateSync();

    if (userValidationErrors && Object.keys(userValidationErrors.errors).length) {
      for (let prop in userValidationErrors.errors) {
        errors[prop] = userValidationErrors.errors[prop].message;
      }
    }

    if (passportValidationErrors && Object.keys(passportValidationErrors.errors).length) {
      for (let prop in passportValidationErrors.errors) {
        errors[prop] = passportValidationErrors.errors[prop].message;
      }
    }
    const valid = Object.keys(errors).length === 0 ? true : false;

    return {
      errors,
      isValid: valid
    };
  }
};
