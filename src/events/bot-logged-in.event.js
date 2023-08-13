import { Events } from 'discord.js'
import chalk from 'chalk'
import { consola } from 'consola'

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
