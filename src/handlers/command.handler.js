const { readdirSync } = require("fs")

const { prefix } = require(__dirname + "/../config/config.js")

const { Collection } = require("discord.js")

const ascii = require("ascii-table")

const table = new ascii().setHeading("Command", "Load status")

module.exports = (client) => {
  // Collections
  client.commands = new Collection()
  // Cooldowns Collection
  const cooldowns = new Collection()

  const commandFiles = readdirSync(__dirname + "/../commands").filter((file) =>
    file.endsWith(".command.js"),
  )

  for (const file of commandFiles) {
    const command = require(__dirname + `/../commands/${file}`)

    if (command.name) {
      client.commands.set(command.name, command)
      table.addRow(file, "✅")
    } else {
      table.addRow(file, "❌  -> missing 'name'!")
      continue
    }
  }

  console.log(table.toString())

  client.on("message", (msg) => {
    const { author, guild } = msg

    // Check if user is a bot
    if (author.bot) {
      return
    }

    // Ignore messages without prefix
    if (!msg.content.startsWith(prefix)) return

    const args = msg.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g)

    const cmdName = args.shift().toLowerCase()

    const cmd =
      client.commands.get(cmdName) ||
      client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(cmdName),
      )

    // Check if commands exist
    if (!cmd) return

    // Check if command only allowed in guild
    if (cmd.guildOnly && !guild) {
      return msg.reply("I can't execute that command inside DMs!")
    }

    if (cmd.args && !args.length) {
      let reply = `You didn't provide any arguments, ${msg.author}!`

      if (cmd.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${cmd.name} ${cmd.usage}\``
      }

      return msg.channel.send(reply)
    }

    // Check cooldowns
    if (!cooldowns.has(cmdName)) {
      cooldowns.set(cmdName, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(cmdName)
    const cooldownAmount = (cmd.cooldown || 3) * 1000

    if (timestamps.has(msg.author.id)) {
      const expirationTime = timestamps.get(msg.author.id) + cooldownAmount

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        return msg.reply(
          `please wait ${timeLeft.toFixed(
            1,
          )} more second(s) before reusing the \`${cmdName}\` command.`,
        )
      }
    }

    timestamps.set(msg.author.id, now)
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)

    try {
      cmd.run(msg, args)
    } catch (error) {
      console.error(error)
      msg.reply("there was an error trying to execute that command!")
    }
  })
}
