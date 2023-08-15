import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong, bot and API latency!'),

    async execute(interaction) {
        const timestamp = Date.now()
        await interaction.reply('Pinging...')

        interaction.editReply({
            content: `Pong! Bot Latency: ${
                Date.now() - timestamp
            }ms | API Latency: ${Math.round(interaction.client.ws.ping)}ms`,
        })
    },
}
