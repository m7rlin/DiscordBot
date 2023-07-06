import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js'

import { TOKEN, CLIENT_ID, GUILD_ID } from './config'
import pingCommand from './commands/utils/ping.command'

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

client.on(Events.ClientReady, () => {
    console.log(`Zalogowano jako ${client.user.tag}!`)
})

client.on(Events.InteractionCreate, (interaction) => {
    if (!interaction.isChatInputCommand()) return

    pingCommand.execute(interaction)
})

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
