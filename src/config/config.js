const dotenv = require("dotenv").config()

module.exports = {
  TOKEN: process.env.token,
  PREFIX: process.env.prefix,
  OWNER: process.env.owner,
  CORONA_API: "https://corona.lmao.ninja/v2",
}
