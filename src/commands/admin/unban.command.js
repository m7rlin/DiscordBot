import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'
import consola from 'consola'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Odbanowuje gracza z serwera.')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Użytkownik do odbanowania')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option.setName('reason').setDescription('Powód odbanowania'),
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

    async execute(interaction) {
        // /ban <user> [reason]
        const targetUser = interaction.options.getUser('user')
        const reason =
            interaction.options.getString('reason') || 'Nie podano powodu'

        await interaction.deferReply({ ephemeral: true })

        const commandMember = interaction.member
        const botMember = interaction.guild.members.me

        // Sprawdź, czy użytkownik próbuje odbanowąć samego siebie
        if (targetUser.id == commandMember.user.id) {
            return interaction.editReply('Nie możesz odbanować samego siebie.')
        }

        // Sprawdź, czy użytkownik próbuje odbanować tego bota
        if (targetUser.id == interaction.client.user.id) {
            return interaction.editReply('Nie mogę odbanować samego siebie.')
        }

        // Sprawdź uprawnienia użytkownika
        if (!commandMember.permissions.has(PermissionFlagsBits.BanMembers)) {
            return interaction.editReply(
                'Nie masz uprawnień do banowania użytkowników.',
            )
        }

        // Sprawdź uprawnienia bota
        if (!botMember.permissions.has(PermissionFlagsBits.BanMembers)) {
            return interaction.editReply(
                'Nie mam uprawnień do banowania użytkowników.',
            )
        }

        const guildBans = await interaction.guild.bans.fetch()
        if (!guildBans.size) {
            return interaction.editReply(
                'Ta gildia nie posiada zbanowanych użytkowników.',
            )
        }

        if (guildBans.has(targetUser.id)) {
            // console.log('user is banned')
            // Odbanuj użytkownika
            return this.unbanUser(interaction, targetUser, reason)
        }

        // console.log(guildBans)

        interaction.editReply('Ten użytkownik nie jest zbanowany!')
    },

    async unbanUser(interaction, targetUser, reason) {
        try {
            await interaction.guild.bans.remove(targetUser.id)

            await interaction.editReply(
                `Odbanowano użytkownika ${targetUser.tag} z powodem: "${reason}"`,
            )
        } catch (error) {
            consola.error(error)
            interaction.editReply(
                'Nie można odbanować użytkownika! Wystąpił błąd podczas wykonywania tej komendy. Skontaktuj się z deweloperem bota.',
            )
        }
    },
}
