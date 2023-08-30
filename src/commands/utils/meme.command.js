import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Wyswietla meme.')
        .addStringOption((option) =>
            option
                .setName('search')
                .setDescription('Wyszukiwanie.')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('filter')
                .setDescription('Meme filter.')
                .setRequired(true)
                .addChoices(
                    {
                        name: 'Wideo',
                        value: 'filter_wideo',
                    },
                    {
                        name: 'Gify',
                        value: 'filter_gif',
                    },
                    {
                        name: 'Obrazki',
                        value: 'filter_image',
                    },
                    {
                        name: 'Teksty',
                        value: 'filter_text',
                    },
                ),
        ),
    async execute(interaction) {
        const search = interaction.options.getString('search')
        const filter = interaction.options.getString('filter')

        console.log('search', search)
        console.log('filter', filter)

        interaction.reply(`Oto twoj meme: value: ${filter}.`)
    },
}
