import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Odpowiada tekstem użytkownika.')
        .addStringOption((option) =>
            option
                .setName('input')
                .setDescription('Tekst do odpowiedzenia.')
                .setRequired(true)
                .setMinLength(10)
                .setMaxLength(20),
        )
        .addIntegerOption((option) =>
            option
                .setName('money')
                .setDescription('Ilosc pieniedzy.')
                .setMinValue(10)
                .setMaxValue(100),
        )
        .addBooleanOption((option) =>
            option.setName('embed').setDescription('Jest embed?'),
        )
        .addRoleOption((option) =>
            option.setName('role').setDescription('Rola'),
        )
        .addUserOption((option) =>
            option.setName('user').setDescription('User'),
        )
        .addChannelOption((option) =>
            option.setName('channel').setDescription('Channel'),
        ),
    async execute(interaction) {
        const input = interaction.options.getString('input')
        const channel = interaction.options.getChannel('channel')
        const isEmbed = interaction.options.getBoolean('embed')

        console.log('input', input)
        console.log('channel', channel)
        console.log('isEmbed', isEmbed)

        interaction.reply(input)
    },
}
