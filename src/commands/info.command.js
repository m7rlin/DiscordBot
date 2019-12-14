const { RichEmbed } = require("discord.js")

module.exports = {
  name: "info",
  description: "Display bot info.",

  run(msg, args) {
    const { channel } = msg

    const botAuthor = "m7rlin"
    const botVersion = "v1.0"
    const botName = "MagicTM — Clock"
    const botDescription =
      "Bot, który dodaje możliwość zegara oraz statystyk serwera."

    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle(botName)
      // Set the color of the embed
      .setColor(0xb348ff)
      // Set the main content of the embed
      .setDescription(botDescription)
      .addField("Autor", botAuthor, true)
      .addField("Wersja", botVersion, true)

    channel.send(embed)
  },
}
