const Discord = require("discord.js")
const chalk = require("chalk")

const config = require("./config/config.js")

const client = new Discord.Client()

const log = console.log

client.on("ready", () => {
  log(chalk.green(`Zalogowano jako ${client.user.tag}!`))
})

client.on("message", (msg) => {
  const { author } = msg

  // Check if user is a bot
  if (author.bot) {
    return
  }

  if (msg.content === "!ping") {
    msg.reply("Pong!")
  }
})

client.login(config.token)
