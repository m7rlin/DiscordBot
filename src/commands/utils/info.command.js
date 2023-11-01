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
            'Wyświetla informacje o deweloperze, wersji, linki pomocnicze i inne...',
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
        // console.log(subcommand)

        if (subcommand === 'bot') {
            const embed = new EmbedBuilder()
                .setTitle('Informacje')
                .setColor(COLORS.PRIMARY)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter({
                    // iconURL: client.user.displayAvatarURL(),
                    text: EMBED_FOOTER_TEXT,
                })
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
                        value: `${packageJson.author}\n• [stawowczyk.me](https://stawowczyk.me)`,
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

            interaction.editReply({ embeds: [embed] })
        } else if (subcommand === 'server') {
            const server = interaction.guild
            const displayOwner = true

            if (!server.available) {
                return await this.guildNotAvailable(interaction)
            }

            const memberCount = server.members.cache.filter(
                (member) => !member.user.bot,
            ).size
            const botCount = server.members.cache.filter(
                (member) => member.user.bot,
            ).size

            // console.log(memberCount, botCount)

            const embed = new EmbedBuilder()
                .setTitle(`Informacje o serwerze ${server.name}`)
                .setColor(COLORS.PRIMARY)
                .setThumbnail(server.iconURL())
                .setFooter({
                    // iconURL: client.user.displayAvatarURL(),
                    text: EMBED_FOOTER_TEXT,
                })
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

            if (displayOwner) {
                const owner = await server.fetchOwner()
                embed.addFields({
                    name: 'Właściciel',
                    value: `${owner.user.displayName} (ID: ${owner.id})`,
                })
            }

            interaction.editReply({ embeds: [embed] })
        } else if (subcommand === 'user') {
            const user =
                interaction.options.getUser('target') || interaction.user

            const server = interaction.guild
            if (!server.available) {
                return await this.guildNotAvailable(interaction)
            }

            const member = server.members.cache.get(interaction.user.id)

            const embed = new EmbedBuilder()
                .setTitle(`Informacje o użytkowniku ${user.tag}`)
                .setColor(COLORS.PRIMARY)
                .setThumbnail(user.displayAvatarURL())
                .setFooter({
                    // iconURL: client.user.displayAvatarURL(),
                    text: EMBED_FOOTER_TEXT,
                })
                .addFields([
                    {
                        name: 'Nazwa użytkownika (ID)',
                        value: `${user.username} (${user.id})`,
                    },
                    {
                        name: 'Członek od',
                        value: `${dayjs(member.joinedTimestamp).format(
                            FORMAT_DATE,
                        )}`,
                    },
                ])

            interaction.editReply({ embeds: [embed] })
        }
    },

    async guildNotAvailable(interaction) {
        return await interaction.editReply('Gilia jest niedostępna.')
    },
}
