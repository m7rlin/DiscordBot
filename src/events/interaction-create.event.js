import { Collection, Events } from 'discord.js'
import { consola } from 'consola'
import { DEFAULT_COMMAND_COOLDOWN } from '../config'

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return

        const { commandName, client } = interaction
        const { cooldowns } = client

        const command = interaction.client.commands.get(interaction.commandName)

        if (!command) {
            consola.error(`No command matching ${commandName} was found.`)
            return
        }

        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection())
        }

        const now = Date.now()
        const timestamps = cooldowns.get(command.data.name)

        const cooldownAmount =
            (command.cooldown ?? DEFAULT_COMMAND_COOLDOWN) * 1000

        if (timestamps.has(interaction.user.id)) {
            const expirationTime =
                timestamps.get(interaction.user.id) + cooldownAmount

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000)
                return interaction.reply({
                    content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
                    ephemeral: true,
                })
            }
        }

        timestamps.set(interaction.user.id, now)
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount)

        try {
            // Execute command
            await command.execute(interaction)
        } catch (error) {
            consola.error(error)
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            })
        }
    },
}
