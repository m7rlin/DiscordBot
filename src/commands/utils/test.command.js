import { SlashCommandBuilder } from 'discord.js'
import { setTimeout as wait } from 'node:timers/promises'

export default {
    cooldown: 0,
    data: new SlashCommandBuilder().setName('test').setDescription('Testing!'),

    async execute(interaction) {
        // Zwykła odpowiedź
        //
        // interaction.reply('To jest moja odpowiedź!')
        //
        // Efemeryczne odpowiedzi
        //
        // interaction.reply({
        //     content: 'To jest ukryta odpowiedź. Tylko ty ją widzisz.',
        //     ephemeral: true,
        // })
        //
        // Edytowanie odpowiedzi
        //
        // await interaction.reply('Jaka jest dzisiaj pogoda?')
        // await interaction.editReply('Dzisiaj jest bardzo ładna pogoda ☀')
        //
        // Edytowanie odpowiedzi z cooldownem
        //
        // await interaction.reply('Jaka jest dzisiaj pogoda?')
        // await wait(2000)
        // await interaction.editReply('Dzisiaj jest bardzo ładna pogoda ☀')
        //
        // Opóźnione odpowiedzi
        //
        // await interaction.deferReply()
        // await wait(4000)
        // await interaction.editReply('2 + 2 = 4!')
        //
        // Pamiętaj, że jeśli chcesz, aby odpowiedź była efemeryczna,
        // musisz przekazać flagę efemeryczną do InteractionDeferReplyOptions tutaj:
        //
        // await interaction.deferReply({ ephemeral: true })
        // await wait(4000)
        // await interaction.editReply('2 + 2 = 4!')
        //
        // Follow-ups
        //
        // await interaction.reply({ content: 'Ładowanie...', ephemeral: true })
        // await interaction.followUp('10%')
        // await interaction.followUp('80%')
        // await interaction.followUp('100%')
        // Uwaga!
        // await interaction.deferReply({
        //     ephemeral: true,
        // })
        // await wait(2000)
        // await interaction.followUp('10%')
        // await interaction.followUp('80%')
        // await interaction.followUp('100%')
        // // Links
        // await interaction.followUp(
        //     'Załóż konto na [MagicTM](https://magictm.com)',
        // )
        //
        // Usuwanie odpowiedzi
        // await interaction.reply('Pong!')
        // await wait(2000)
        // await interaction.deleteReply()
        //
        // Ładowanie odpowiedzi
        // await interaction.reply('Pong!')
        // const message = await interaction.fetchReply()
        // console.log(message)
        // message.react('💛')
        //
        // Tłumaczenie
        // const locales = {
        //     'en-US': 'Hi',
        //     de: 'Hallo',
        //     pl: 'Cześć',
        // }
        // console.log('locale:', interaction.locale)
        // interaction.reply(locales[interaction.locale])
        // const locales = {
        //     'en-US': {
        //         welcome: 'Hi',
        //     },
        //     de: {
        //         welcome: 'Hallo',
        //     },
        //     pl: {
        //         welcome: 'Cześć',
        //     },
        // }
        // console.log('locale:', interaction.locale)
        // interaction.reply(locales[interaction.locale].welcome)
        //
        // Advanced locale
        // const locales = {
        //     'en-US': {
        //         welcome: 'Hi',
        //     },
        //     de: {
        //         welcome: 'Hallo',
        //     },
        //     pl: {
        //         welcome: 'Cześć',
        //     },
        // }
        // function $t(locale, key) {
        //     return locales[locale][key]
        // }
        // console.log('locale:', interaction.locale)
        // interaction.reply($t(interaction.locale, 'welcome'))
    },
}
