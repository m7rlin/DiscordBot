const Discord = require("discord.js")
const chalk = require("chalk")

const { token, prefix } = require("./config/config.js")

const client = new Discord.Client()

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
    channel.send(`Autorem bota jest **${botAuthor}**! Wersjsa *${botVersion}*.`)
  }
})

client.login(token)
