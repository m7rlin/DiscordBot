module.exports = {
  name: "ping",
  description: "Ping!",
  guildOnly: true,
  cooldown: 5,

  run(msg, args) {
    msg.reply("Pong!")
  },
}
