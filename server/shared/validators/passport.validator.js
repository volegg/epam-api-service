module.exports = {
  passportValid: function(value, maxLength = 10) {
    const isPassportNumberLengthValid = (value.length < maxLength) ? true : false;
    const isPassportNumberFormatValid = (/^[A-Z]{2}[0-9]{7}$/.test(value)) ? true : false;

    return isPassportNumberLengthValid && isPassportNumberFormatValid;
  },
  identificationNumber : function(value, maxLength = 9) {
    const isPasspoerIndentificationNumberLengthValid = (value.length <= maxLength) ? true : false;
    const isPasspoerIndentificationNumberFormatValid = (/^[2-3][0-9]{6}(PB|GB|BI)$/.test(value)) ? true : false;

    return isPasspoerIndentificationNumberLengthValid && isPasspoerIndentificationNumberFormatValid;
  },
  authority : function(value, maxLength = 100) {
    return value.length < maxLength;
  }
};
