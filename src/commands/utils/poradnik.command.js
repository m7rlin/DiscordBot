import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('poradnik')
        .setDescription('Wyświetla poradnik z kanału m7rlin.')
        .addStringOption((option) =>
            option
                .setName('category')
                .setDescription('Kategoria podnika')
                .setAutocomplete(true),
        )
        .addStringOption((option) =>
            option
                .setName('query')
                .setDescription('Poradnik, którego szukasz')
                .setAutocomplete(true),
        ),

    async execute(interaction) {
        const category = interaction.options.getString('category')
        const query = interaction.options.getString('query')

        interaction.reply(`Kategoria: ${category} | Szukasz: ${query}`)
    },

    autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true)

        console.log('focusedOption', focusedOption)

        let choices

        if (focusedOption.name === 'query') {
            choices = [
                'Moje ustawienia VSCODE',
                'Jak stworzyc serwer Minecraft',
                'Darmowy serwer Aternos',
                'DiscordJS Bot od podstaw',
            ]
        }

        if (focusedOption.name === 'category') {
            choices = ['vscode', 'minecraft', 'minecraft server', 'discordjs']
        }

        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedOption.value),
        )

        // console.log(
        //     'without filter:',
        //     filtered,
        //     'with filter:',
        //     filtered.map(function (choice) {
        //         return {
        //             name: choice,
        //             value: choice,
        //         }
        //     }),
        // )

        interaction.respond(
            filtered.map((choice) => ({
                name: choice,
                value: choice,
            })),
        )
    },
}
