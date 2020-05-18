const axios = require("axios")

const { CORONA_API } = require(__dirname + "/../config/config.js")

module.exports = (client) => {
  const instance = axios.create({
    baseURL: CORONA_API,
  })

  client.axios = instance
}
