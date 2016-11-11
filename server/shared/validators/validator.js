function isCountryValid(reg, str) {
  if (reg.test(str)) {
    return false;
  } else {
    return true;
  }
}

function isObjectEmpty(object) {
  if (Object.keys(object).length !== 0) {
    return false;
  } else {
    return true;
  }
}

module.exports = validator = function(data) {
  let errors = {};

  if (Object.keys(data).length === 0) {
    errors.message = 'The body of request is empty.';
  } else {
    if (data.name === undefined) {
      errors.name = 'The name is required.';
    }

    if (data.surename === undefined) {
      errors.surename = 'The surename is required.';
    }

    if (data.sex === undefined) {
      errors.sex = 'The sex is required.';
    }

    if (data.birthday === undefined) {
      errors.birthday = 'The birthday is required.';
    }

    if (data.country === undefined) {
      errors.country = 'The country is required.';
    }

    if (data.passportNumber === undefined) {
      errors.passportNumber = 'The passport number is required.';
    }
    if (data.identificationNumber === undefined) {
      errors.identificationNumber = 'The identification number is required.';
    }
    if (data.issueDate === undefined) {
      errors.issueDate = 'The is issueDate required.';
    }
    if (data.expiryDate === undefined) {
      errors.expiryDate = 'The expiry date is required.';
    }
    if (data.authority === undefined) {
      errors.authority = 'The is authority required.';
    }
  }
  return {
    errors,
    isValid: isObjectEmpty(errors)
  }
};
