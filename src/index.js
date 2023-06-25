import { Client, GatewayIntentBits } from 'discord.js'
import displayResourcesUsage from './utils/display-resources-usage'

// Anti bot crash system
import AntiCrash from './anti-crash'
AntiCrash.init()

import CommandHandler from './CommandHandler'
import EventHandler from './EventHandler'

import { TOKEN } from './config'
import ConsoleAppInfo from './utils/console-app-info'

const RESOURCES_LOG_INTERVAL = 1000 * 1

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

// Display app info
ConsoleAppInfo()

// Handlers
const commandHandler = new CommandHandler(client)
const eventHandler = new EventHandler(client)

;(async () => {
    // Register commands
    await Promise.all([
        commandHandler.loadCommand('./commands/utils/ping.command'),
        commandHandler.loadCommand('./commands/utils/user.command'),
        commandHandler.loadCommand('./commands/utils/server.command'),
    ])

    commandHandler.displayLoadedCommands()

    // Add handlers to the client
    client.commandHandler = commandHandler
    client.eventHandler = eventHandler

    // Login bot
    client.login(TOKEN)

    // Resources info usage
    let logInterval = RESOURCES_LOG_INTERVAL
    if (logInterval <= 0) return
    if (logInterval < 1000) logInterval = 1000

    displayResourcesUsage()
    setInterval(() => {
        displayResourcesUsage()
    }, logInterval)
})()
