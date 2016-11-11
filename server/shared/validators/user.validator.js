function IsCountryValid(reg, str) {
  if (reg.test(str)) {
    return true;
  } else {
    return false;
  }
}

function isObjectEmpty(object) {
  if (Object.keys(object).length !== 0) {
    return false;
  } else {
    return true;
  }
}

module.exports = isUserEmpty = function(data) {
  let errors = {};
  console.log(data);
  if (Object.keys(data).length === 0) {
    errors.message = 'The body of request is empty.';
  } else {
    if (data.name === undefined) {
      errors.name = 'The name is required.'
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
}
  return {
    errors,
    isValid: isObjectEmpty(errors)
  }
};
