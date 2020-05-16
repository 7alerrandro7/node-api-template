const checkIfEmpty = (field) => {
    return (field === undefined || field === '');
};

const checkIfNotEmpty = (field) => {
    return !checkIfEmpty(field);
};

const checkIfAnyIsEmpty = (...fields) => {
    for (let i = 0; i < fields.length; i++) {
        if (checkIfEmpty(fields[i])) {
            return true
        }
    }
    return false;
};

module.exports = {
    checkIfNotEmpty: checkIfNotEmpty,
    checkIfEmpty: checkIfEmpty,
    checkIfAnyIsEmpty: checkIfAnyIsEmpty
};
