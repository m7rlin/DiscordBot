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

        const userId = interaction.user.id

        if (timestamps.has(userId)) {
            const expirationTime = timestamps.get(userId) + cooldownAmount

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000)
                return interaction.reply({
                    content: `Komendę ${commandName} możesz ponownie użyć <t:${expiredTimestamp}:R>.`,
                    ephemeral: true,
                })
            }
        }

        // Set cooldown
        timestamps.set(userId, now)
        // Delete cooldown
        setTimeout(() => timestamps.delete(userId), cooldownAmount)

        try {
            // Execute command
            await command.execute(interaction)
        } catch (error) {
            consola.error(error)
            await interaction.reply({
                content: 'Wystąpił błąd podczas wykonywania tego polecenia!',
                ephemeral: true,
            })
        }
    },
}
