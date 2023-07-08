import chalk from 'chalk'
import { consola } from 'consola'
import { Events } from 'discord.js'

export default {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        consola.success(
            chalk.greenBright(`Zalogowano jako ${client.user.tag}!`),
        )

        // Register commands
        client.commandHandler.registerGuildCommands()
    },
}
