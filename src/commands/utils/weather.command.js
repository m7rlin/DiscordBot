import { SlashCommandBuilder } from 'discord.js'

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

        interaction.reply(`Informacje o pogodzie w województwie **${voivod}**`)
    },

    autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused()

        console.log('focusedValue', focusedValue)

        const choices = ['Małopolskie', 'Mazowieckie']

        const test = (choice) => {
            console.log('choice', choice)
            return choice.startsWith(focusedValue)
        }

        const filtered = choices.filter(test)

        console.log('filtered', filtered)

        // const respond = []
        // filtered.forEach((value) => {
        //     respond.push({
        //         name: value,
        //         value,
        //     })
        // })

        const respond = filtered.map((x) => ({
            name: x,
            value: x,
        }))

        interaction.respond(respond)
    },
}
