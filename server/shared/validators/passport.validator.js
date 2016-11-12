module.exports = {
  passportValid: function(value, maxLength = 10) {
    const isPassportNumberLengthValid = (value.length < maxLength) ? true : false;
    const isPassportNumberFormatValid = (/^[A-Z]{2}[0-9]{7}$/.test(value)) ? true : false;

    return isPassportNumberLengthValid && isPassportNumberFormatValid;
  },
  identificationNumber : function(value, maxLength = 9) {
    return value.length <= maxLength;
  },
  authority : function(value, maxLength = 100) {
    return value.length < maxLength;
  }
};