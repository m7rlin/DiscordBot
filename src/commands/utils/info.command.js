import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Wyświetla informacje o użytkowniku albo serwerze!')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption((option) =>
                    option.setName('target').setDescription('The user'),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('server')
                .setDescription('Info about the server'),
        ),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand()

        if (!subcommand) return interaction.reply('Nie wybrano polecenia!')

        if (subcommand === 'user') {
            interaction.reply('Informacje o użytkowniku x')
        } else if (subcommand === 'server') {
            interaction.reply('Informacje o serwerze')
        }
    },
}
