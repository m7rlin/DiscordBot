import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Wyświetla informacje o serwerze albo użytkowniku.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption((option) =>
                    option.setName('target').setDescription('The user'),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('server')
                .setDescription('Info about the server'),
        )
        .addSubcommand((subcommand) =>
            subcommand.setName('bot').setDescription('Info about the bot'),
        ),

    async execute(interaction) {
        // Check which subcommand was used
        const subcommand = interaction.options.getSubcommand()

        if (subcommand === 'user') {
            // Retrieve the target user
            const user =
                interaction.options.getUser('target') || interaction.user

            // Create an embed with user information
            const userEmbed = {
                color: 0x0099ff,
                title: `User Information for ${user.tag}`,
                thumbnail: {
                    url: user.displayAvatarURL({ dynamic: true }),
                },
                fields: [
                    {
                        name: 'Username',
                        value: user.username,
                        inline: true,
                    },
                    {
                        name: 'User ID',
                        value: user.id,
                        inline: true,
                    },
                ],
            }

            // Reply with the user embed
            await interaction.reply({ embeds: [userEmbed] })
        } else if (subcommand === 'server') {
            // Retrieve server information
            const server = interaction.guild

            // Create an embed with server information
            const serverEmbed = {
                color: 0x0099ff,
                title: `Server Information for ${server.name}`,
                fields: [
                    {
                        name: 'Server ID',
                        value: server.id,
                    },
                    {
                        name: 'Member Count',
                        value: server.memberCount.toString(),
                    },
                ],
            }

            // Reply with the server embed
            await interaction.reply({ embeds: [serverEmbed] })
        } else if (subcommand === 'bot') {
            // Retrieve bot information
            const bot = interaction.client.user

            // Create an embed with bot information
            const botEmbed = {
                color: 0x0099ff,
                title: 'Bot Information',
                thumbnail: {
                    url: bot.displayAvatarURL({ dynamic: true }),
                },
                fields: [
                    {
                        name: 'Username',
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

            // Reply with the bot embed
            await interaction.reply({ embeds: [botEmbed] })
        }
    },
}
