const axios = require("axios")

const { corona_api } = require(__dirname + "/../config/config.js")

module.exports = (client) => {
  const instance = axios.create({
    baseURL: corona_api,
  })

  client.axios = instance
}
