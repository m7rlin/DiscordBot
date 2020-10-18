const { MessageEmbed } = require("discord.js")
const logChannelId = "693247147713495080"
const messageChannelId = "692474755663527986"

module.exports = {
  name: "guildMemberAdd",

  run(member) {
    const logChannel = member.guild.channels.cache.get(logChannelId)
    const messageChannel = member.guild.channels.cache.get(messageChannelId)

    // Send welcome message
    messageChannel.send(`<@${member.user.id}>, witaj na najlepszym serwerze w wszechświecie!`)

    // Send log channel message
    const embed = new MessageEmbed()
      .setTitle("Nowy użytkownik")

      .setColor(0x00ff04)
      .setDescription(`<@${member.user.id}> dołączył(-a) do serwera.`)

    logChannel.send(embed)
  }  
}