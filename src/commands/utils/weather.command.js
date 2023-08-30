import { SlashCommandBuilder } from 'discord.js'
import weatherData from '../../../data/voivodships.json' assert { type: 'json' }
import { deburr } from 'lodash-es'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Displays weather informations!')
        .addStringOption((option) =>
            option
                .setName('voivod')
                .setDescription('Województwo')
                .setRequired(true)
                .setAutocomplete(true),
        ),

    async execute(interaction) {
        const voivod = interaction.options.getString('voivod')

        const data = weatherData[voivod]

        interaction.reply(
            `Informacje o pogodzie w województwie **${data.name}**\nTemperatura: ${data.weather.temperature}\nPogoda: ${data.weather.description}`,
        )
    },

    autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused()

        const keys = Object.keys(weatherData)

        const filtered = keys.filter((x) =>
            x.startsWith(deburr(focusedValue.toLowerCase())),
        )

        // console.log('filtered', filtered)
        // console.log(Object.entries(weatherData))

        const filteredData = filtered.map((key) => {
            const data = weatherData[key]
            data.key = key
            return data
        })

        // console.log('filteredData', filteredData)

        interaction.respond(
            filteredData.map((voivod) => ({
                name: voivod.name,
                value: voivod.key,
            })),
        )
    },
}
