const { MessageEmbed } = require("discord.js")
const logChannelId = "693247147713495080"

module.exports = {
  name: "guildMemberRemove",

  run(member) {
    const logChannel = member.guild.channels.cache.get(logChannelId)

    // Send log channel message
    const embed = new MessageEmbed()
      .setTitle("Użytkownik wyszedł")

      .setColor(0xff0000)
      .setDescription(`[<@${member.user.id}>](${member.displayName}) opuścił(-a) serwer.`)

    logChannel.send(embed)
  }  
}