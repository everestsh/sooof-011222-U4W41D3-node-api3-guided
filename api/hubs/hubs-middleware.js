const Hub = require('./hubs-model')
async function checkHubId(req, res, next) {
    // 1
    // console.log('Checking hub id')
    // next()

    // 2
    try {
        const possibleHub = await Hub.findById(req.params.id)
        if (possibleHub) {
          // we already have the hub
          req.hub = possibleHub
          next()
        } else {
          // send an error to the err handling middleware in server.js
          next({ status: 404, message: `No Hub ${req.params.id}` })
        }
      } catch (err) {
        next(err)
      }
}

module.exports = {
    checkHubId,
}