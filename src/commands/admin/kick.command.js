import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Wyrzuca gracza z serwera.')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption((option) =>
            option
                .setName('user')
                .setDescription('Użytkownik do wyrzucenia')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option.setName('reason').setDescription('Powód wyrzucenia'),
        )
        .setDMPermission(false),

    async execute(interaction) {
        const commandUser = interaction.user
        const targetUser = interaction.options.getUser('user')
        const reason =
            interaction.options.getString('reason') || 'Brak podanego powodu.'

        // Sprawdź, czy próbuje zbanować samego siebie
        if (targetUser.id === commandUser.id) {
            return interaction.reply('Nie możesz wyrzucić samego siebie.')
        }

        // Sprawdź, czy próbuje zbanować tego bota
        if (targetUser.id === interaction.client.user.id) {
            return interaction.reply('Nie mogę wyrzucić samego siebie.')
        }

        // Sprawdź uprawnienia
        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            return interaction.reply(
                'Nie masz uprawnień do wyrzucenia użytkowników.',
            )
        }

        const commandMember = interaction.guild.members.cache.get(
            commandUser.id,
        )
        const memberToBan = targetUser.guild.members.cache.get(targetUser.id)

        if (
            commandMember.roles.highest.position <=
            memberToBan.roles.highest.position
        ) {
            return interaction.reply(
                'Nie możesz wyrzucić użytkownika o wyższej lub równej roli.',
            )
        }

        // Wyrzuć użytkownika
        await memberToBan.kick({ reason })

        await interaction.reply(
            `Wyrzucono użytkownika ${targetUser.tag} z powodem: "${reason}"`,
        )
    },
}
