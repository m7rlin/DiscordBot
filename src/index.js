const { Client, GatewayIntentBits, REST, Routes } = require('discord.js')
require('dotenv').config()

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
]

const TOKEN = process.env.TOKEN
const CLIENT_ID = '1087096405899874377'

// const rest = new REST({ version: '10' }).setToken(TOKEN)

// ;(async () => {
//     try {
//         console.log('Started refreshing application (/) commands.')

//         // await rest.put(
//         //     Routes.applicationGuildCommands(CLIENT_ID, '594198055352401923'),
//         //     {
//         //         body: commands,
//         //     },
//         // )

//         await rest
//             .put(Routes.applicationCommands(CLIENT_ID), { body: [] })
//             .catch(console.error)

//         console.log('Successfully reloaded application (/) commands.')
//     } catch (error) {
//         console.error(error)
//     }
// })()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!')
    }
})

client.login(TOKEN)
