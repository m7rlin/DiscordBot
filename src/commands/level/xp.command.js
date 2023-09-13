/* eslint-disable no-shadow */
import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('xp')
        .setDescription('Zarządzaj punktami doświadczenia użytkowników.')
        .addSubcommandGroup((subcommandGroup) =>
            subcommandGroup
                .setName('add')
                .setDescription('Dodaj punkty doświadczenia użytkownikowi.')
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('punkty')
                        .setDescription(
                            'Dodaj określoną liczbę punktów doświadczenia użytkownikowi.',
                        )
                        .addUserOption((option) =>
                            option
                                .setName('uzytkownik')
                                .setDescription('Użytkownik')
                                .setRequired(true),
                        )
                        .addIntegerOption((option) =>
                            option
                                .setName('ilosc')
                                .setDescription('Ilość punktów do dodania')
                                .setRequired(true),
                        ),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('poziom')
                        .setDescription(
                            'Dodaj określoną ilość poziomu użytkownikowi.',
                        )
                        .addUserOption((option) =>
                            option
                                .setName('uzytkownik')
                                .setDescription('Użytkownik')
                                .setRequired(true),
                        )
                        .addIntegerOption((option) =>
                            option
                                .setName('ilosc')
                                .setDescription('Ilość poziomu do dodania')
                                .setRequired(true),
                        ),
                ),
        )
        .addSubcommandGroup((subcommand) =>
            subcommand
                .setName('set')
                .setDescription(
                    'Ustaw ilość punktów doświadczenia użytkownika.',
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('punkty')
                        .setDescription(
                            'Ustaw określoną ilość punktów doświadczenia użytkownika.',
                        )
                        .addUserOption((option) =>
                            option
                                .setName('uzytkownik')
                                .setDescription('Użytkownik')
                                .setRequired(true),
                        )
                        .addIntegerOption((option) =>
                            option
                                .setName('ilosc')
                                .setDescription(
                                    'Nowa ilość punktów doświadczenia',
                                )
                                .setRequired(true),
                        ),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('poziom')
                        .setDescription(
                            'Ustaw określoną ilość poziomu użytkownika.',
                        )
                        .addUserOption((option) =>
                            option
                                .setName('uzytkownik')
                                .setDescription('Użytkownik')
                                .setRequired(true),
                        )
                        .addIntegerOption((option) =>
                            option
                                .setName('ilosc')
                                .setDescription('Nowa ilość poziomu')
                                .setRequired(true),
                        ),
                ),
        )
        .addSubcommandGroup((subcommand) =>
            subcommand
                .setName('query')
                .setDescription(
                    'Sprawdź ilość punktów doświadczenia użytkownika.',
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('punkty')
                        .setDescription(
                            'Sprawdź ilość punktów doświadczenia użytkownika.',
                        )
                        .addUserOption((option) =>
                            option
                                .setName('uzytkownik')
                                .setDescription('Użytkownik')
                                .setRequired(true),
                        ),
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName('poziom')
                        .setDescription('Sprawdź ilość poziomu użytkownika.')
                        .addUserOption((option) =>
                            option
                                .setName('uzytkownik')
                                .setDescription('Użytkownik')
                                .setRequired(true),
                        ),
                ),
        ),

    async execute(interaction) {
        // Sprawdź, która grupa podkomend i która podkomenda zostały użyte
        const subcommandGroup = interaction.options.getSubcommandGroup()
        const subcommand = interaction.options.getSubcommand()

        if (subcommandGroup === 'add') {
            if (subcommand === 'punkty') {
                // Pobierz użytkownika i ilość punktów do dodania
                const uzytkownik = interaction.options.getUser('uzytkownik')
                const iloscPunktow = interaction.options.getInteger('ilosc')

                // Twoja logika dodawania punktów doświadczenia użytkownikowi
                // Zastąp poniższą linię swoją implementacją
                await interaction.reply(
                    `Dodaję ${iloscPunktow} punktów doświadczenia użytkownikowi ${uzytkownik.username}.`,
                )
            } else if (subcommand === 'poziom') {
                // Pobierz użytkownika i ilość poziomu do dodania
                const uzytkownik = interaction.options.getUser('uzytkownik')
                const iloscPoziomu = interaction.options.getInteger('ilosc')

                // Twoja logika dodawania poziomu użytkownikowi
                // Zastąp poniższą linię swoją implementacją
                await interaction.reply(
                    `Dodaję ${iloscPoziomu} poziomu użytkownikowi ${uzytkownik.username}.`,
                )
            }
        } else if (subcommandGroup === 'set') {
            if (subcommand === 'punkty') {
                // Pobierz użytkownika i nową ilość punktów doświadczenia
                const uzytkownik = interaction.options.getUser('uzytkownik')
                const nowaIloscPunktow = interaction.options.getInteger('ilosc')

                // Twoja logika ustawiania ilości punktów doświadczenia użytkownika
                // Zastąp poniższą linię swoją implementacją
                await interaction.reply(
                    `Ustawiam nową ilość punktów doświadczenia użytkownika ${uzytkownik.username} na ${nowaIloscPunktow}.`,
                )
            } else if (subcommand === 'poziom') {
                // Pobierz użytkownika i nową ilość poziomu
                const uzytkownik = interaction.options.getUser('uzytkownik')
                const nowaIloscPoziomu = interaction.options.getInteger('ilosc')

                // Twoja logika ustawiania ilości poziomu użytkownika
                // Zastąp poniższą linię swoją implementacją
                await interaction.reply(
                    `Ustawiam nową ilość poziomu użytkownika ${uzytkownik.username} na ${nowaIloscPoziomu}.`,
                )
            }
        } else if (subcommandGroup === 'query') {
            if (subcommand === 'punkty') {
                // Pobierz użytkownika
                const uzytkownik = interaction.options.getUser('uzytkownik')

                // Twoja logika sprawdzania ilości punktów doświadczenia użytkownika
                // Zastąp poniższą linię swoją implementacją
                await interaction.reply(
                    `Ilość punktów doświadczenia użytkownika ${uzytkownik.username}: [Wstaw odpowiedź].`,
                )
            } else if (subcommand === 'poziom') {
                // Pobierz użytkownika
                const uzytkownik = interaction.options.getUser('uzytkownik')

                // Twoja logika sprawdzania ilości poziomu użytkownika
                // Zastąp poniższą linię swoją implementacją
                await interaction.reply(
                    `Ilość poziomu użytkownika ${uzytkownik.username}: [Wstaw odpowiedź].`,
                )
            }
        }
    },
}
