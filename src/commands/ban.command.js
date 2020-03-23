const {
  Permissions: { FLAGS },
} = require("discord.js")

module.exports = {
  name: "ban",
  description: "Ban user.",
  args: true,
  usage: "<user> [days(0-7)] [reason]",
  botPermissions: [FLAGS.BAN_MEMBERS],
  userPermissions: [FLAGS.BAN_MEMBERS],

  run(msg, args) {
    const { channel, guild, mentions, author } = msg

    let daysArg = +args[1]

    // Validate days
    if (!isNaN(daysArg)) {
      if (daysArg < 0) daysArg = 0
      if (daysArg > 7) daysArg = 7
    }

    const reasonArg = [...args].slice(isNaN(daysArg) ? 1 : 2).join(" ")

    const userToBan = mentions.users.first()

    if (!userToBan) {
      return msg.reply("you must provide a valid user to ban.")
    }

    if (userToBan.id === author.id) {
      return msg.reply("you can't ban yourself!")
    }

    const memberToBan = guild.members.cache.get(userToBan.id)

    if (!memberToBan.bannable) {
      return channel.send("I need more permissions to execute this command.")
    }

    // Add ban options
    const banOptions = {
      reason: reasonArg,
    }

    // Add number of days of messages to delete
    if (!isNaN(daysArg)) banOptions.days = daysArg

    // Ban user
    memberToBan.ban(banOptions).then((bannedUser) => {
      channel.send(
        `User ${bannedUser.displayName} has been banned.\n${
          reasonArg ? `Reason: \`${reasonArg}\`` : ""
        }`,
      )
    })
  },
}
