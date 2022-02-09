
function checkHubId(req, res, next) {
    console.log('Checking hub id')
    next()
}

module.exports = {
    checkHubId,
}