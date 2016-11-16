const { Passport } = require('../../models');

module.exports = {
  passportNumberValid: function(value, maxLength = 10) {
    const isPassportNumberLengthValid = (value.length < maxLength) ? true : false;
    const isPassportNumberFormatValid = (/^[A-Z]{2}[0-9]{7}$/.test(value)) ? true : false;

    return isPassportNumberLengthValid && isPassportNumberFormatValid;
  },
  identificationNumberValid: function(value, maxLength = 9) {
    const isPasspoerIndentificationNumberLengthValid = (value.length <= maxLength) ? true : false;
    const isPasspoerIndentificationNumberFormatValid = (/^[2-3][0-9]{6}(PB|GB|BI)$/.test(value)) ? true : false;

    return isPasspoerIndentificationNumberLengthValid && isPasspoerIndentificationNumberFormatValid;
  },
  authorityValid: function(value, maxLength = 100) {
    return value.length < maxLength;
  },
  isIssueDateValid: function(date) {
    return new Date(date).toString() === 'Invalid Date';
  },
  isExpiryDateValid: function(date) {
    return new Date(date).toString() === 'Invalid Date';
  }
};
