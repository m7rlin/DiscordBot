import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription(
            'Wyświetla informacje o serwerze, użytkowniku albo bocie.',
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('Informacje o użytkowniku')
                .addUserOption((option) =>
                    option.setName('target').setDescription('Użytkownik'),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('server')
                .setDescription('Informacje o serwerze'),
        )
        .addSubcommand((subcommand) =>
            subcommand.setName('bot').setDescription('Informacje o bocie'),
        ),

    async execute(interaction) {
        // /info user [user]
        // /info server
        // /info bot
        const subcommand = interaction.options.getSubcommand()
        // console.log(subcommand)

        if (subcommand === 'bot') {
            const bot = interaction.client.user

            // console.log(bot)

            const botEmbed = {
                color: 0x9a28fb,
                title: 'Informacje o bocie',
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

            interaction.reply({ embeds: [botEmbed] })
        } else if (subcommand === 'server') {
            const server = interaction.guild

            const serverEmbed = {
                color: 0x9a28fb,
                title: `Informacje o serwerze ${server.name}`,
                fields: [
                    {
                        name: 'ID serwera',
                        value: server.id,
                    },
                    {
                        name: 'Ilość użytkowników',
                        value: server.memberCount,
                    },
                ],
            }

            interaction.reply({ embeds: [serverEmbed] })
        } else if (subcommand === 'user') {
            const user =
                interaction.options.getUser('target') || interaction.user

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

            const userEmbed2 = {
                color: 0x9a28fb,
                title: `Informacje o użytkowniku ${user.tag}`,
                thumbnail: {
                    url: user.displayAvatarURL(),
                },
                fields: [
                    {
                        name: 'Nazwa użytkownika',
                        value: user.username,
                    },
                    {
                        name: 'ID użytkownika',
                        value: user.id,
                    },
                ],
            }

            interaction.reply({ embeds: [userEmbed] })
        }
    },
}
