import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'
import { COMMAND_BAN_BAN_ONLY_MEMBERS } from '../../config'
import consola from 'consola'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banuje gracza z serwera.')
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Użytkownik do zbanowania')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option.setName('reason').setDescription('Powód bana'),
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
        // const targetMember = interaction.guild.members.cache.get(targetUser.id)
        const targetMember = await interaction.guild.members
            .fetch(targetUser.id)
            .catch(() => null)

        if (COMMAND_BAN_BAN_ONLY_MEMBERS && targetMember == null) {
            return interaction.editReply(
                'Użytkownik nie jest członkiem tej gildii!',
            )
        }

        // Sprawdź, czy użytkownik próbuje zbanować samego siebie
        if (targetUser.id == commandMember.user.id) {
            return interaction.editReply('Nie możesz zbanować samego siebie.')
        }

        // Sprawdź, czy użytkownik próbuje zbanować tego bota
        if (targetUser.id == interaction.client.user.id) {
            return interaction.editReply('Nie mogę zbanować samego siebie.')
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

        const targetHighestRolePosition =
            targetMember?.roles?.highest?.position ?? -1
        const commandHighestRolePosition = commandMember.roles.highest.position
        const botHighestRolePosition = botMember.roles.highest.position

        // console.log(
        //     commandHighestRolePosition,
        //     targetHighestRolePosition,
        //     botHighestRolePosition,
        // )

        // Sprawdź, czy użytkownik ma wyższą/równą rangę niż bot
        if (targetHighestRolePosition >= botHighestRolePosition) {
            return interaction.editReply(
                'Nie mogę zbanować użytkownika o wyższej lub równej roli.',
            )
        }

        // Właściciel serwera zawsze może wyrzucić użytkownika
        if (interaction.user.id === interaction.guild.ownerId) {
            // console.log('Komenda uzyta przez wlasciciela serwera!')
            if (COMMAND_BAN_BAN_ONLY_MEMBERS) {
                return this.banMember(interaction, targetMember, reason)
            } else {
                return this.banUser(interaction, targetUser, reason)
            }
        }

        // Sprawdź, czy użytkownik do zbanowania ma wyższą/równą rangę niż bot
        if (targetHighestRolePosition >= commandHighestRolePosition) {
            return interaction.editReply(
                'Nie możesz zbanować użytkownika o wyższej lub równej roli.',
            )
        }

        // Sprawdź, czy użytkownika da się zbanowąć
        if (!targetMember?.bannable) {
            return interaction.editReply('Nie mogę zbanować tego użytkownika!')
        }

        // Zbanuj użytkownika
        if (COMMAND_BAN_BAN_ONLY_MEMBERS) {
            await this.banMember(interaction, targetMember, reason)
        } else {
            await this.banUser(interaction, targetUser, reason)
        }
    },

    async banUser(interaction, targetUser, reason) {
        try {
            await interaction.guild.members.ban(targetUser, { reason })

            await interaction.editReply(
                `Zbanowano użytkownika ${targetUser.tag} z powodem: "${reason}"`,
            )
        } catch (error) {
            consola.error(error)
            interaction.editReply(
                'Nie można zbanować użytkownika! Wystąpił błąd podczas wykonywania tej komendy. Skontaktuj się z deweloperem bota.',
            )
        }
    },
    async banMember(interaction, targetMember, reason) {
        try {
            await targetMember.ban({ reason })

            await interaction.editReply(
                `Zbanowano użytkownika ${targetMember.user.tag} z powodem: "${reason}"`,
            )
        } catch (error) {
            consola.error(error)
            interaction.editReply(
                'Nie można zbanować użytkownika gildii! Wystąpił błąd podczas wykonywania tej komendy. Skontaktuj się z deweloperem bota.',
            )
        }
    },
}
