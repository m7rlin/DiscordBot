import { SlashCommandBuilder } from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('ping2')
        .setDescription('Wysyla Pong! By Merlin!'),

    async execute(interaction) {
        await interaction.reply('Pinging2...')

        interaction.editReply('Pong2!')
    },
}
