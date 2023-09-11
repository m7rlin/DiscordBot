import { SlashCommandBuilder, bold } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('poradnik')
        .setDescription('Wyświetla poradnik z kanału m7rlin.')
        .addStringOption((option) =>
            option
                .setName('category')
                .setDescription('Kategoria poradnika')
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

        interaction.reply(`category: ${bold(category)} query: ${bold(query)}`)
    },

    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true)

        let choices

        if (focusedOption.name === 'query') {
            choices = [
                'Popular Topics: Threads',
                'Sharding: Getting started',
                'Library: Voice Connections',
                'Interactions: Replying to slash commands',
                'Popular Topics: Embed preview',
            ]
        }

        if (focusedOption.name === 'category') {
            choices = [
                'minecraft',
                'discord',
                'discordjs',
                'web',
                'minecraft plugin',
            ]
        }

        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedOption.value),
        )

        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice })),
        )
    },
}
