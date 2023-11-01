import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Rzut monetą. Orzeł czy reszka? Masz 50% szans.'),

    async execute(interaction) {
        const { user } = interaction

        // Wygeneruj losową liczbę, która będzie reprezentować orła (0) lub reszkę (1)
        const result = Math.random() < 0.5 ? 'Orzeł' : 'Reszka'

        const embed = new EmbedBuilder()
            .setTitle('Rzut monetą (Orzeł czy reszka)')
            .setColor(Colors.Gold)
            .setThumbnail(user.displayAvatarURL())

            .addFields([
                {
                    name: 'Wynik',
                    value: result,
                },
            ])
            .setDescription('Czy to będzie Orzeł czy Reszka? :coin:')

        interaction.reply({ embeds: [embed] })
    },
}
