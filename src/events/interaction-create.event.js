import { Events } from 'discord.js'
import pingCommand from '../commands/ping.command'

export default {
    name: Events.InteractionCreate,

    execute(interaction) {
        if (!interaction.isChatInputCommand()) return

        pingCommand.execute(interaction)
    },
}
