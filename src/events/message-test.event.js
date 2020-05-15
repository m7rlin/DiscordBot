const {
  Constants: { Events },
} = require("discord.js")

module.exports = {
  name: Events.MESSAGE_CREATE,

  run(msg) {
    console.log(msg.content, "msg")
  },
}
