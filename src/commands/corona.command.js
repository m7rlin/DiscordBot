const { MessageEmbed } = require("discord.js")
const { ucfirst } = require("js-helpers")

module.exports = {
  name: "corona",
  description:
    "Displays informations about deaths, confirmed and recovered cases.",
  aliases: ["virus", "vir"],
  args: true,
  usage: "<country|all>",
  cooldown: 10,

  async run(msg, args) {
    const {
      channel,
      client: { axios },
    } = msg

    const arg = args[0]

    const title = "Korona wirus"

    // Create RichEmbed
    const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle(title)
      // Set the color of the embed
      .setColor(0xb348ff)

    // Display global statistics
    if (arg === "all") {
      const data = await axios.get("all").then(({ data }) => {
        return data
      })

      const { cases, deaths, recovered } = data

      // Set the main content of the embed
      embed.setDescription("Globalne statystyki Korona wirus.")

      embed.addField(
        ":thermometer: Przypadki",
        cases.toLocaleString("pl-PL"),
        true,
      )
      embed.addField(":skull: Śmierci", deaths.toLocaleString("pl-PL"), true)
      embed.addField(
        ":green_heart: Wyleczeni",
        recovered.toLocaleString("pl-PL"),
        true,
      )

      return channel.send(embed)
    }

    // Display statistics for specific country if exist
    const data = await axios.get("countries").then(({ data }) => {
      return data
    })

    const countryName = ucfirst(arg.toLowerCase())

    const country = data.filter((x) => x.country === countryName)

    // Country not found
    if (!country.length) {
      return msg.reply(`country \`${countryName}\` not found.`)
    }

    const {
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      critical,
    } = country[0]

    // Set the main content of the embed
    embed.setDescription(`Statystyki dla kraju \`${country[0].country}\`.`)

    embed.addField(
      ":thermometer: Przypadki",
      cases.toLocaleString("pl-PL"),
      true,
    )
    embed.addField(":skull: Śmierci", deaths.toLocaleString("pl-PL"), true)
    embed.addField(
      ":green_heart: Wyleczeni",
      recovered.toLocaleString("pl-PL"),
      true,
    )

    return channel.send(embed)
  },
}
