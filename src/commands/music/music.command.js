import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('Kontroluj odtwarzanie muzyki na serwerze.')
        .addSubcommandGroup((subcommandGroup) =>
            subcommandGroup
                .setName('play')
                .setDescription('Odtwarzaj piosenkę lub dodaj ją do kolejki.')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('song')
                        .setDescription(
                            'Odtwórz określoną piosenkę, podając link lub tytuł.',
                        )
                        .addStringOption((option) =>
                            option
                                .setName('query')
                                .setDescription('Nazwa piosenki lub link')
                                .setRequired(true),
                        ),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('queue')
                        .setDescription('Pokaż bieżącą kolejkę odtwarzania.'),
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('pause')
                .setDescription(
                    'Wstrzymaj odtwarzanie aktualnie granej piosenki.',
                ),
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('skip')
                .setDescription('Pomiń aktualnie graną piosenkę.'),
        ),

    async execute(interaction) {
        // Sprawdź, która podkomenda i grupa podkomend zostały użyte
        const subcommandGroup = interaction.options.getSubcommandGroup()
        const subcommand = interaction.options.getSubcommand()

        if (subcommandGroup === 'play') {
            if (subcommand === 'song') {
                // Pobierz zapytanie dotyczące piosenki
                const songQuery = interaction.options.getString('query')

                // Twoja logika odtwarzania piosenki znajdzie się tutaj
                // Zastąp poniższą linię swoją implementacją
                await interaction.reply(`Odtwarzam piosenkę: "${songQuery}"`)
            } else if (subcommand === 'queue') {
                // Twoja logika wyświetlania kolejki muzycznej znajdzie się tutaj
                // Zastąp poniższą linię swoją implementacją
                await interaction.reply('Wyświetlam kolejkę muzyczną...')
            }
        } else if (subcommand === 'pause') {
            // Twoja logika wstrzymywania odtwarzania muzycznego znajdzie się tutaj
            // Zastąp poniższą linię swoją implementacją
            await interaction.reply('Wstrzymuję odtwarzanie muzyki...')
        } else if (subcommand === 'skip') {
            // Twoja logika pomijania aktualnie granej piosenki znajdzie się tutaj
            // Zastąp poniższą linię swoją implementacją
            await interaction.reply('Pomijam aktualnie granej piosenki...')
        }
    },
}
