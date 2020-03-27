const {
  Permissions: { FLAGS },
} = require("discord.js")

module.exports = {
  name: "kick",
  description: "Kick user.",
  args: true,
  usage: "<user> [reason]",
  botPermissions: [FLAGS.KICK_MEMBERS],
  userPermissions: [FLAGS.KICK_MEMBERS],

  run(msg, args) {
    const { channel, guild, mentions, author } = msg

    const reasonArg = [...args].slice(1).join(" ")

    const userToKick = mentions.users.first()

    if (!userToKick) {
      return msg.reply("you must provide a valid user to kick.")
    }

    if (userToKick.id === author.id) {
      return msg.reply("you can't kick yourself!")
    }

    const memberToKick = guild.members.cache.get(userToKick.id)

    if (!memberToKick.kickable) {
      return channel.send("I need more permissions to execute this command.")
    }

    memberToKick.kick(reasonArg).then((res) => {
      channel.send(
        `User ${res.displayName} has been kicked.\n${
          reasonArg ? `Reason: ${reasonArg}` : ""
        }`,
      )
    })
  },
}
