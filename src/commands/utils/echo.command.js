import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Odpowiada twoim tekstem.')
        .addStringOption((option) =>
            option.setName('input').setDescription('Tekst do odpowiedzenia.'),
        )
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('The channel to echo into'),
        )
        .addIntegerOption((option) =>
            option
                .setName('integer')
                .setDescription('The integer to echo into'),
        )
        .addBooleanOption((option) =>
            option.setName('ephemeral').setDescription('Wyświetl jako embed.'),
        ),
    async execute(interaction) {
        const input = interaction.options.getString('input')
        if (!input) return interaction.reply("Nie podano argumentu 'input'!")

        console.log(interaction.options.getBoolean('ephemeral'))

        interaction.reply(input)
    },
}
