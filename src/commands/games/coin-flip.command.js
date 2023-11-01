import { Colors, EmbedBuilder, SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Rzut monetą. Orzeł czy reszka? Masz 50% szans.')
        .addStringOption((option) =>
            option
                .setName('bet')
                .setDescription('Obstaw wynik: Orzeł lub Reszka')
                .setRequired(false)
                .addChoices(
                    {
                        name: 'Orzeł',
                        value: 'orzel',
                    },
                    {
                        name: 'Reszka',
                        value: 'reszka',
                    },
                ),
        ),

    async execute(interaction) {
        const { user } = interaction

        const bet = interaction.options.getString('bet')

        // Wygeneruj losową liczbę, która będzie reprezentować orła (0) lub reszkę (1)
        const randomResult = Math.random() < 0.5 ? 'orzel' : 'reszka'

        const embed = new EmbedBuilder()
            .setTitle('Rzut monetą (Orzeł czy reszka)')
            .setColor(Colors.Gold)
            .setThumbnail(user.displayAvatarURL())

            .addFields([
                {
                    name: 'Wynik',
                    value: randomResult === 'orzel' ? 'Orzeł' : 'Reszka',
                },
            ])
            .setDescription('Czy to będzie Orzeł czy Reszka? :coin:')

        if (bet) {
            embed.addFields({
                name: 'Obstawione',
                value: bet === 'orzel' ? 'Orzeł' : 'Reszka',
            })

            if (bet === randomResult) {
                embed.addFields({
                    name: 'Wynik obstawienia',
                    value: 'Poprawnie obstawione! 🎉',
                })
            } else {
                embed.addFields({
                    name: 'Wynik obstawienia',
                    value: 'Niestety źle obstawione. 😔',
                })
            }
        }

        interaction.reply({ embeds: [embed] })
    },
}
