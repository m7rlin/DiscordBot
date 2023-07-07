import { Client, GatewayIntentBits, REST, Routes } from 'discord.js'

import { TOKEN, CLIENT_ID, GUILD_ID } from './config'
import pingCommand from './commands/ping.command'
import EventHandler from './EventHandler'

// Anti bot crash system
import AntiCrash from './anti-crash'
AntiCrash.init()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

// Handlers
new EventHandler(client)

const discordCommands = []

const rest = new REST().setToken(TOKEN)

discordCommands.push(pingCommand.data.toJSON())

try {
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: discordCommands,
    }).then((res) => {
        console.log(
            `Successfully reloaded ${res.length} application (/) commands.`,
        )
    })
} catch (error) {
    console.error(error)
}

client.login(TOKEN)
