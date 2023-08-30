import { consola } from 'consola'
import { Events } from 'discord.js'

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isAutocomplete()) return

        const { commandName } = interaction
        const command = interaction.client.commands.get(interaction.commandName)

        if (!command) {
            consola.error(`No command matching ${commandName} was found.`)
            return
        }

        try {
            await command.autocomplete(interaction)
        } catch (error) {
            consola.error(error)
        }
    },
}
