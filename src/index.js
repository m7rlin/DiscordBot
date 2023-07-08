import { Client, GatewayIntentBits } from 'discord.js'

import { TOKEN } from './config'
import EventHandler from './EventHandler'
import CommandHandler from './CommandHandler'
import AntiCrash from './anti-crash'
import { consola } from 'consola'
import packageJson from '../package.json' assert { type: 'json' }

// Anti bot crash system
AntiCrash.init()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

// Handlers
const commandHandler = new CommandHandler(client)
const eventHandler = new EventHandler(client)

consola.start(`Starting app '${packageJson.name}'`)
consola.box(`Author:  ${packageJson.author}\nVersion: ${packageJson.version}`)

// Register commands
await Promise.all([
    commandHandler.loadCommand('./commands/utils/ping.command'),
    // commandHandler.loadCommand('./commands/utils/user.command'),
    // commandHandler.loadCommand('./commands/utils/server.command'),
])

commandHandler.displayLoadedCommands()

// Add handlers to the client
client.commandHandler = commandHandler
client.eventHandler = eventHandler

// Login bot
client.login(TOKEN)
