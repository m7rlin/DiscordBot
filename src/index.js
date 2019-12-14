const { Client } = require("discord.js")
const chalk = require("chalk")

const { token } = require("./config/config.js")

const client = new Client()

const commandHandler = require("./handlers/command.handler")

const log = console.log

// Initialize Comamnd Manager
commandHandler(client)

client.on("ready", () => {
  log(chalk.green(`Zalogowano jako ${client.user.tag}!`))
})

client.login(token)

// Error handler - omit crashed
client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})
