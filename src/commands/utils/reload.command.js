const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads a command.')
        .addStringOption((option) =>
            option
                .setName('command')
                .setDescription('The command to reload.')
                .setRequired(true),
        ),
    async execute(interaction) {
        const commandName = interaction.options
            .getString('command', true)
            .toLowerCase()
        const command = interaction.client.commands.get(commandName)

        if (!command) {
            return interaction.reply(
                `There is no command with name \`${commandName}\`!`,
            )
        }
    },
}
