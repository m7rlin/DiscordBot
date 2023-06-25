import { Events } from 'discord.js'
import chalk from 'chalk'

export default {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(chalk.greenBright(`Zalogowano jako ${client.user.tag}!`))

        // Register commands
        client.commandHandler.registerGuildCommands()
    },
}
