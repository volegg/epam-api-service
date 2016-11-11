module.exports = {
    nameValidator: function(value, maxLength = 30) {
        return value.length < maxLength;
    },
    surnameValidator: function(value, maxLength = 60) {
        return value.length < maxLength;
    },
    countryValidator: function(value) {
        return /^[A-Z]{3}$/.test(value);
    }
};