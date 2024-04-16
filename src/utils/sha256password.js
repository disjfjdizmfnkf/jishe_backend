const crypto = require('crypto')

// function sha256password(password) {
//     const hash = crypto.createHash('sha256');
//     hash.update(password);
//     return hash.digest('hex');
// }

function sha256password(password) {
    const hash = crypto.createHash('sha256');
    return hash.update(password).digest('hex')
}

module.exports = sha256password