module.exports = {
  name: "clock",
  description: "Clock command.",
  args: true,
  guildOnly: true,
  usage: "<action>[add]",

  async run(msg, args) {
    const { channel, guild, client } = msg

    // const time = new Date().toLocaleTimeString().slice(0, 5)
    const time = new Date().toLocaleTimeString()
    const channelName = `🕥 ${time}`

    const createdChannel = await guild.createChannel(channelName, {
      type: "voice",
    })

    if (createdChannel) {
      const channelId = createdChannel.id

      const { settings } = client
      // Save channel id to config
      if (!settings.get(guild.id)) {
        settings.set(guild.id, { clocks: [] })
      }
      client.settings.get(guild.id).clocks.push(channelId)
      client.saveConfig(guild.id)
    }
  },
}
