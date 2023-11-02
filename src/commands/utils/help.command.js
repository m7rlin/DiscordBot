import { EmbedBuilder } from '@discordjs/builders'
import { SlashCommandBuilder } from 'discord.js'
import {
    COLORS,
    EMBED_FOOTER_TEXT,
    COMMAND_HELP_COMMANDS_PER_PAGE,
} from '../../config'

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Wyświetla informacje pomocnicze o komendach.')
        .addIntegerOption((option) =>
            option.setName('page').setDescription('Strona'),
        ),
    async execute(interaction) {
        // /help <page>
        // /help <command>

        await interaction.deferReply({ ephemeral: true })

        const { client } = interaction

        const commands = Array.from(client.commands)
        const commandsCount = commands.length

        const page = interaction.options.getInteger('page') || 1
        const startIndex = (page - 1) * COMMAND_HELP_COMMANDS_PER_PAGE
        const endIndex = startIndex + COMMAND_HELP_COMMANDS_PER_PAGE

        const commandList = commands.slice(startIndex, endIndex)

        const totalPages = Math.ceil(
            commandsCount / COMMAND_HELP_COMMANDS_PER_PAGE,
        )

        if (commandList.length === 0) {
            await interaction.editReply(
                'Nieprawidłowy numer strony. Na tej stronie nie ma żadnych poleceń.',
            )
            return
        }

        const embed = new EmbedBuilder()
            .setTitle('Komendy')
            .setDescription(
                `Wyniki \`${commandsCount}\`\nStrona \`${page}/${totalPages}\`: Oto lista dostępnych poleceń:`,
            )
            .setColor(COLORS.INFO)
            // .setThumbnail(client.user.displayAvatarURL())
            .setFooter({
                // iconURL: client.user.displayAvatarURL(),
                text: EMBED_FOOTER_TEXT,
            })

        embed.addFields(
            commandList.map((cmd) => ({
                name: `/${cmd[0]}`,
                value: cmd[1].data.description,
            })),
        )

        interaction.editReply({ embeds: [embed] })

        // Set a timeout to delete the interaction after 10 seconds
        setTimeout(() => {
            interaction.deleteReply()
        }, 10 * 1000)
    },
}
