import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Deletes messages on current channel.')
        .addIntegerOption((option) =>
            option
                .setName('amount')
                .setDescription('Amount of messages to delete.')
                .setMinValue(5)
                .setMaxValue(100),
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDMPermission(false),

    async execute(interaction) {
        const { options, channel } = interaction
        const amountMessagesToDelete = options.getInteger('amount') ?? 5

        await interaction.reply({
            content: `Started deleting ${amountMessagesToDelete} message(s).`,
            ephemeral: true,
        })

        const messages = await channel.bulkDelete(amountMessagesToDelete, true)

        await interaction
            .editReply(`Successfully deleted ${messages.size} message(s).`)
            .catch(console.error)
    },
}
