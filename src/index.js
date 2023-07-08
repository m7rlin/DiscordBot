import { Client, GatewayIntentBits } from 'discord.js'

import { TOKEN } from './config'
import EventHandler from './EventHandler'
import CommandHandler from './CommandHandler'
import AntiCrash from './anti-crash'

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
const eventHandler = new EventHandler(client)
const commandHandler = new CommandHandler(client, {})

// Add handlers to the client
client.commandHandler = commandHandler
client.eventHandler = eventHandler

// Register commands
await Promise.all([
    commandHandler.loadCommand('./commands/util/ping.command'),
    commandHandler.loadCommand('./commands/util/ping2.command'),
])

client.login(TOKEN)
