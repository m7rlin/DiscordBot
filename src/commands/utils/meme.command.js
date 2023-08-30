import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Wyszukuje mema.')
        .addStringOption((option) =>
            option
                .setName('filter')
                .setDescription('Filter')
                .setRequired(true)
                .addChoices(
                    { name: 'Wideo', value: 'filter_video' },
                    { name: 'Gify', value: 'filter_gif' },
                    { name: 'Obrazki', value: 'filter_image' },
                    { name: 'Teksty', value: 'filter_text' },
                ),
        )
        .addStringOption((option) =>
            option.setName('search').setDescription('Tekst do wyszukania.'),
        ),

    async execute(interaction) {
        console.log(interaction.options)
        const search = interaction.options.getString('search')
        if (!search) return interaction.reply("Nie podano argumentu 'search'!")

        const filter = interaction.options.getString('filter')

        interaction.reply(search + ' Filter: ' + filter)
    },
}
