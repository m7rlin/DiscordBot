import { consola } from 'consola'
import { Client, GatewayIntentBits } from 'discord.js'
import packageJson from '../package.json' assert { type: 'json' }
import CommandHandler from './CommandHandler'
import EventHandler from './EventHandler'
import AntiCrash from './utils/anti-crash.util'
import { TOKEN } from './config'

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
    // Utils
    commandHandler.loadCommand('./commands/utils/ping.command'),
    commandHandler.loadCommand('./commands/utils/info.command'),
    // Admin
    commandHandler.loadCommand('./commands/admin/ban.command'),
    commandHandler.loadCommand('./commands/admin/kick.command'),
])

commandHandler.displayLoadedCommands()

// Add handlers to the client
client.commandHandler = commandHandler
client.eventHandler = eventHandler

// Login bot
client.login(TOKEN)
