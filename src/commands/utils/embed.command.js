import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Wyświetla testowy embed.'),

    async execute(interaction) {
        const bot = interaction.client.user
        const { user } = interaction

        const botEmbed = {
            color: 0x9a28fb,
            title: 'Tytuł',
            thumbnail: {
                url: bot.displayAvatarURL(),
            },
            fields: [
                {
                    name: 'Nazwa użytkownika',
                    value: bot.username,
                    inline: true,
                },
                {
                    name: 'Bot ID',
                    value: bot.id,
                    inline: true,
                },
            ],
        }

        const fields = [
            {
                name: 'Nazwa użytkownika',
                value: user.username,
            },
            {
                name: 'ID użytkownika',
                value: user.id,
            },
        ]

        const userEmbed = new EmbedBuilder()
            .setTitle(`Informacje o użytkowniku ${user.tag}`)
            .setColor(0x9a28fb)
            .setThumbnail(user.displayAvatarURL())
            .addFields(fields)
            .setTimestamp(Date.now())
            .setImage('https://i.ytimg.com/vi/JrQkgLLL9XQ/sddefault.jpg')
            .setFooter({
                text: 'Footer text',
                iconURL: 'https://i.ytimg.com/vi/JrQkgLLL9XQ/sddefault.jpg',
            })
            .setURL('https://www.youtube.com/@m7rlin/join')

        interaction.reply({ embeds: [botEmbed, userEmbed] })
    },
}
