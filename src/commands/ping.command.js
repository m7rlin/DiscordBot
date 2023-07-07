import { SlashCommandBuilder } from 'discord.js'

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Wysyla Pong! By Merlin!'),

    async execute(interaction) {
        await interaction.reply('Pinging...')

        interaction.editReply('Pong!')
    },
}
