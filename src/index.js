const { Client } = require("discord.js")
const chalk = require("chalk")

const { TOKEN } = require("./config/config.js")

const client = new Client()

const commandHandler = require("./handlers/command.handler")
const settingsHandler = require("./handlers/settings.handler")
const apiHandler = require("./handlers/api.handler")
const eventHandler = require("./handlers/event.handler")

const log = console.log

// Initialize Comamnd Handler
commandHandler(client)
// Initialize Settings Handler
settingsHandler(client)
// Initialize API Handler
apiHandler(client)
// Initialize Event Handler
eventHandler(client)

client.on("ready", () => {
  log(chalk.green(`Zalogowano jako ${client.user.tag}!`))

  // Initialize interval for each guild
  client.settings.forEach((config, guildId) => {
    const { guilds } = client
    // Check if guild exist
    if (guilds.cache.has(guildId)) {
      const guild = guilds.cache.get(guildId)
      // Check if available
      if (guild.available) {
        // console.log("available")

        // Set Interval for each channel
        const clockChannels = config.clocks
        setInterval(() => {
          const time = new Date().toLocaleTimeString().slice(0, 5)
          const channelName = `🕥 ${time}`

          clockChannels.forEach((channelId, index) => {
            // Check if channel exists
            if (guild.channels.cache.has(channelId)) {
              // log("channel exist")
              const channelToUpdate = guild.channels.cache.get(channelId)
              channelToUpdate.setName(channelName)
            } else {
              // log("not exist")
              // Remove Id from config
              // that does not exist
              clockChannels.splice(index, 1)
              client.saveConfig(guildId)
            }
          })
        }, 60 * 1000)
      }
    }
  })
})

// Connect with Discord
client.login(TOKEN)

// Error handler - omit crashed
client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})
