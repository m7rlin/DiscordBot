module.exports = {
  name: "ping",
  description: "Ping!",

  run(msg, args) {
    msg.reply("Pong!")
  },
}
