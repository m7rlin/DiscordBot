import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Odpowiada Pong oraz opóźnieniem bota i API!'),

    async execute(interaction) {},
}
