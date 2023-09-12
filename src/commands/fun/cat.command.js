import { SlashCommandBuilder } from 'discord.js'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder()
        .setName('cat')
        .setNameLocalizations({
            pl: 'kot',
            de: 'katze',
        })
        .setDescription('Get a cute picture of a cat!')
        .setDescriptionLocalizations({
            pl: 'Słodkie zdjęcie kotka!',
            de: 'Poste ein süßes Bild von einer Katze!',
        })
        .addStringOption((option) =>
            option
                .setName('breed')
                .setDescription('Breed of cat')
                .setNameLocalizations({
                    pl: 'rasa',
                    de: 'rasse',
                })
                .setDescriptionLocalizations({
                    pl: 'Rasa kota',
                    de: 'Katzenrasse',
                }),
        ),

    async execute(interaction) {
        const breed = interaction.options.getString('breed')

        interaction.reply(`Oto słodkie zdjęcia kota rasy ${breed}`)
    },
}
