const { Client } = require("discord.js")
const chalk = require("chalk")

const { token } = require("./config/config.js")

const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] })

const commandHandler = require("./handlers/command.handler")
const settingsHandler = require("./handlers/settings.handler")
const apiHandler = require("./handlers/api.handler")

const log = console.log

// Initialize Comamnd Manager
commandHandler(client)
// Initialize Settings Manager
settingsHandler(client)
// Initialize API Manager
apiHandler(client)

const guildRoles = {
  VERIFIED: "709381587791380482",
}

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

client.on("messageReactionAdd", async (reaction, user) => {
  console.log(
    "dodano reakcje!!!",
    reaction.emoji.id,
    reaction.emoji.name,
    reaction.partial,
    reaction,
  )
  const { message } = reaction

  if (message.id === "709381508091346975") {
    const member = message.channel.guild.members.cache.get(user.id)

    // React only for specific emoji
    if (reaction.emoji.name === "👍") {
      // Add verified role for the user
      member.roles.add(guildRoles.VERIFIED)
    }
  }
  // if (message.partial) {
  //   console.log("The message is partial.")
  //   message
  //     .fetch()
  //     .then((fullmessage) => {
  //       console.log(fullmessage.content)
  //     })
  //     .catch((error) => {
  //       console.log("Something went wrong when fetching the message: ", error)
  //     })
  // } else {
  //   console.log("The message is not partial.")
  // }
})

client.on("messageReactionRemove", async (reaction, user) => {
  const { message } = reaction

  if (message.id === "709381508091346975") {
    const member = message.channel.guild.members.cache.get(user.id)

    // React only for specific emoji
    if (reaction.emoji.name === "👍") {
      // Remove verified role from the user
      member.roles.remove(guildRoles.VERIFIED)
    }
  }
})

// Connect with Discord
client.login(token)

// Error handler - omit crashed
client.on("debug", () => {})
client.on("warn", () => {})
client.on("error", () => {})
