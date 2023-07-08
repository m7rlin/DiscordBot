import { Events } from 'discord.js'

export default {
    name: Events.InteractionCreate,

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return

        const { commandName } = interaction

        const command = interaction.client.commands.get(commandName)

        // console.log('commandName', commandName)
        // console.log('command', command)

        if (!command) {
            console.error(`No command matching '${commandName}' was found`)
            return
        }

        // Execute command
        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            })
        }
    },
}
