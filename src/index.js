const { Client, RichEmbed } = require("discord.js")
const chalk = require("chalk")

const { token, prefix } = require("./config/config.js")

const client = new Client()

const log = console.log

client.on("ready", () => {
  log(chalk.green(`Zalogowano jako ${client.user.tag}!`))
})

client.on("message", (msg) => {
  const { author, guild, channel } = msg

  // Check if user is a bot
  if (author.bot || !guild) {
    return
  }

  // Ignore messages without prefix
  if (!msg.content.startsWith(prefix)) return

  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g)

  const cmd = args.shift().toLowerCase()

  if (cmd === "ping") {
    msg.reply("Pong!")
  }

  if (cmd === "info") {
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
  }
})

client.login(token)

// Error handler - omit crashed
client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})
