import { EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import packageJson from '../../../package.json' assert { type: 'json' }
import {
    BOT_INVITE_LINK,
    COLORS,
    EMBED_FOOTER_TEXT,
    FORMAT_DATE,
} from '../../config'
import dayjs from '../../dayjsSetup'

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
        await interaction.deferReply()

        const { client } = interaction

        const subcommand = interaction.options.getSubcommand()
        const displayOwner = true
        // console.log(subcommand)

        if (subcommand === 'bot') {
            const bot = client.user

            // console.log(bot)

            const embed = new EmbedBuilder()
                .setTitle('Informacje o bocie')
                .setColor(COLORS.INFO)
                .setThumbnail(bot.displayAvatarURL())
                .addFields([
                    {
                        name: 'Wersja',
                        value: `${packageJson.version}`,
                        inline: true,
                    },
                    {
                        name: 'Mów mi',
                        value: 'Misio',
                        inline: true,
                    },
                    {
                        name: 'Developer',
                        value: `${packageJson.author}\n • [stawowczyk.me](https://stawowczyk.me)`,
                        inline: false,
                    },
                    {
                        name: 'Linki',
                        value:
                            // '• [Premium](https://dc.magictm.com/premium)\n' +
                            // '• [Pomoc](https://dc.magictm.com/blog)\n' +
                            `• [Zaproś mnie na serwer](${BOT_INVITE_LINK})`,
                        // '• [Żądanie funkcji / Zgłoszenie błędu](https://dc.magictm.com/feedback)',
                        inline: true,
                    },
                ])
                .setFooter({
                    text: EMBED_FOOTER_TEXT,
                })

            interaction.editReply({ embeds: [embed] })
        } else if (subcommand === 'server') {
            if (!interaction.inGuild()) {
                await interaction.editReply(
                    'To polecenie możesz użyć tylko w gildii!',
                )
                return
            }

            const server = interaction.guild
            if (!server.available) {
                await interaction.editReply('Gilia niedostępna!')
                return
            }

            const memberCount = server.members.cache.filter(
                (member) => !member.user.bot,
            ).size

            const botCount = server.members.cache.filter(
                (member) => member.user.bot,
            ).size

            const embed = new EmbedBuilder()
                .setTitle(`Informacje o serwerze ${server.name}`)
                .setColor(COLORS.INFO)
                .setThumbnail(server.iconURL())
                .addFields([
                    {
                        name: 'ID serwera',
                        value: server.id,
                    },
                    {
                        name: 'Członkowie',
                        value: memberCount.toString(),
                        inline: true,
                    },
                    {
                        name: 'Boty',
                        value: botCount.toString(),
                        inline: true,
                    },
                    // {
                    //     name: 'Członkowie (boty)',
                    //     value: `${memberCount.toString()} (${botCount.toString()})`,
                    //     inline: true,
                    // },
                ])
                .setFooter({
                    text: EMBED_FOOTER_TEXT,
                })

            if (displayOwner) {
                const owner = await server.fetchOwner()
                embed.addFields([
                    {
                        name: 'Właściciel',
                        value: `${owner.user.displayName} (ID: ${owner.id})`,
                    },
                ])
            }

            interaction.editReply({ embeds: [embed] })
        } else if (subcommand === 'user') {
            if (!interaction.inGuild()) {
                await interaction.editReply(
                    'To polecenie możesz użyć tylko w gildii!',
                )
                return
            }

            const user =
                interaction.options.getUser('target') || interaction.user

            const server = interaction.guild
            if (!server.available) {
                await interaction.editReply('Gilia niedostępna!')
                return
            }

            const member = server.members.cache.get(user.id)

            if (!member) {
                await interaction.editReply(
                    'Ten użytkownik nie jest członkiem tej gildii!',
                )
                return
            }

            const fields = [
                {
                    name: 'Nazwa użytkownika (ID)',
                    value: `${user.username} (${user.id})`,
                },

                {
                    name: 'Członek od',
                    value: `${dayjs(member.joinedTimestamp).format(
                        FORMAT_DATE,
                    )} (${dayjs(member.joinedTimestamp).fromNow()})`,
                },
            ]

            const embed = new EmbedBuilder()
                .setTitle(`Informacje o użytkowniku ${user.tag}`)
                .setColor(COLORS.INFO)
                .setThumbnail(user.displayAvatarURL())
                .addFields(fields)
                .setFooter({
                    text: EMBED_FOOTER_TEXT,
                })

            interaction.editReply({ embeds: [embed] })
        }
    },
}
