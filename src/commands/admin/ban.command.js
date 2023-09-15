import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Zbanuj użytkownika na serwerze.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Użytkownik do zbanowania')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option.setName('reason').setDescription('Powód zbanowania'),
        )
        .setDMPermission(false),

    async execute(interaction) {
        const commandUser = interaction.user
        const targetUser = interaction.options.getUser('user')
        const reason =
            interaction.options.getString('reason') || 'Brak podanego powodu.'

        await interaction.deferReply()

        const commandMember = interaction.member
        const botMember = interaction.guild.members.me
        const targetMember = await interaction.guild.members
            .fetch(targetUser.id)
            .catch((error) => {
                return null
            })

        if (targetMember == null) {
            interaction.editReply('Użytkownik nie jest członkiem tej gildii!')
            return
        }

        // Sprawdź, czy użytkownik próbuje zbanować samego siebie
        if (targetUser.id === commandUser.id) {
            return interaction.editReply('Nie możesz zbanować samego siebie.')
        }

        // Sprawdź, czy użytkownik próbuje zbanować tego bota
        if (targetUser.id === interaction.client.user.id) {
            return interaction.editReply('Nie mogę zbanować samego siebie.')
        }

        // Sprawdź uprawnienia użytkownika
        if (!commandMember.permissions.has(PermissionFlagsBits.KickMembers)) {
            return interaction.editReply(
                'Nie masz uprawnień do banowanie użytkowników.',
            )
        }

        // Sprawdź uprawnienia bota
        if (!botMember.permissions.has(PermissionFlagsBits.KickMembers)) {
            return interaction.editReply(
                'Bot nie ma uprawnień do wyrzucenia użytkowników.',
            )
        }

        const targetHighestRolePosition = targetMember.roles.highest.position
        const commandMemberHighestRolePosition =
            commandMember.roles.highest.position
        const botHighestRolePosition =
            interaction.guild.members.me.roles.highest.position

        // console.log(
        //     commandMemberHighestRolePosition,
        //     targetHighestRolePosition,
        //     botHighestRolePosition,
        // )

        if (targetHighestRolePosition >= botHighestRolePosition) {
            return interaction.editReply(
                'Nie mogę zbanować użytkownika o wyższej lub równej roli.',
            )
        }

        // Właściciel serwera zawsze może zbanować użytkownika
        if (interaction.user.id === interaction.guild.ownerId) {
            console.log('Komenda uzyta przez wlasciciela serwera!')
            // Zbanuj użytkownika
            return await this.kick(interaction, targetMember, reason)
        }

        if (targetHighestRolePosition >= commandMemberHighestRolePosition) {
            return interaction.editReply(
                'Nie możesz zbanować użytkownika o wyższej lub równej roli.',
            )
        }

        if (!targetMember.bannable) {
            return interaction.editReply('Nie mogę zbanować tego użytkownika.')
        }

        // Zbanuj użytkownika
        await this.ban(interaction, targetMember, reason)
    },

    async ban(interaction, targetMember, reason) {
        try {
            await targetMember.ban({ reason })

            await interaction.editReply(
                `Zbanowano użytkownika ${targetMember.user.tag} z powodem: "${reason}"`,
            )
        } catch (error) {
            interaction.reply(
                'Nie można zbanować użytkownika! Wystąpił błąd podczas wykonywania tej komendy. Skontaktuj się z deweloperem bota.',
            )
        }
    },
}
