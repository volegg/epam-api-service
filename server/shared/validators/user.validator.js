const countries = require('../../constants/countries');
const moment = require('moment');
const { DATE_FORMAT } = require('../../config');
const sex = require('../../models/types/sex.type');

module.exports = {
  nameValidator: function(value, maxLength = 30) {
    return value.length < maxLength;
  },
  surnameValidator: function(value, maxLength = 60) {
    return value.length < maxLength;
  },
  countryValidator: function(value) {
    const isCountryExist = (countries.indexOf(value) !== -1) ? true : false;
    const isCountryFormatValid = /^[A-Z]{3}$/.test(value) ? true : false;

    return isCountryExist && isCountryFormatValid;
  },
  isBirthDayValid: function(date) {
      return moment(date, DATE_FORMAT, true).isValid();
  },
  isBirthDayFormatValid: function(value) {
    moment(date, DATE_FORMAT, true).isValid()
  },
  isUserValid: function(user) {
    const isNameValid = this.nameValidator(user.name);
    const isSurnameValid = this.surnameValidator(user.name);
    const isCountryValid = this.countryValidator(user.country);

    return isNameValid && isSurnameValid && isCountryValid;
  },
  isSexValid: function(value) {
    return sex[value];
  }
};
