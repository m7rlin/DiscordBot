import chalk from 'chalk'
import { Events } from 'discord.js'

export default {
    name: Events.ClientReady,
    once: true,

    execute(client) {
        console.log(chalk.greenBright(`Zalogowano jako ${client.user.tag}!`))
    },
}
