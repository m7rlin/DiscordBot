import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('weather')

        .setDescription('Displays weather informations!')
        .addStringOption((option) =>
            option
                .setName('voivod')
                .setDescription('Województwo')
                .setAutocomplete(true),
        ),

    async execute(interaction) {
        const voivod = interaction.options.getString('voivod') ?? 'default'

        interaction.reply(`Informacje o pogodzie w województwie **${voivod}**`)
    },

    autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused()

        console.log(focusedValue)

        const choices = [
            'Dolnośląskie',
            'Kujawsko-pomorskie',
            'Lubelskie',
            'Łódzkie',
        ]
        const filteredCoices = choices.map((x) => {
            return x.toLowerCase()
        })
        const filtered = filteredCoices.filter((choice) =>
            choice.startsWith(focusedValue.toLowerCase()),
        )

        console.log('filtered', filtered)

        const respond = [
            {
                name: 'ABC',
                value: 'abc',
            },
        ]

        interaction.respond(respond)
    },
}
