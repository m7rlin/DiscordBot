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
        const userToBan = interaction.options.getUser('user')
        const reason =
            interaction.options.getString('reason') || 'Brak podanego powodu.'

        // Sprawdź, czy próbuje zbanować samego siebie
        if (userToBan.id === commandUser.id) {
            return interaction.reply('Nie możesz zbanować samego siebie.')
        }

        // Sprawdź, czy próbuje zbanować tego bota
        if (userToBan.id === interaction.client.user.id) {
            return interaction.reply('Nie mogę zbanować samego siebie.')
        }

        // Sprawdź uprawnienia
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply(
                'Nie masz uprawnień do banowania użytkowników.',
            )
        }

        const commandMember = interaction.guild.members.cache.get(
            commandUser.id,
        )
        const memberToBan = userToBan.guild.members.cache.get(userToBan.id)

        if (
            commandMember.roles.highest.position <=
            memberToBan.roles.highest.position
        ) {
            return interaction.reply(
                'Nie możesz zbanować użytkownika o wyższej lub równej roli.',
            )
        }

        // Zbanuj użytkownika
        await memberToBan.ban({ reason })

        await interaction.reply(
            `Zbanowano użytkownika ${userToBan.tag} z powodem: "${reason}"`,
        )
    },
}
