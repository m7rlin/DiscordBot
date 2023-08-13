import { Collection, REST, Routes } from 'discord.js'
import fs from 'fs'
import path from 'path'
import { TOKEN, CLIENT_ID, GUILD_ID } from './config'
import chalk from 'chalk'
import { AsciiTable3, AlignmentEnum } from 'ascii-table3'
import fileDirName from './utils/file-dir-name.util'
import { consola } from 'consola'

const { __dirname } = fileDirName(import.meta)

class CommandHandler {
    constructor(client, options = {}) {
        this.client = client
        client.commands = new Collection()
        client.cooldowns = new Collection()

        this.options = Object.assign(
            {
                autoload: false,
                autoloadDir: './src/commands',
            },
            options,
        )

        // console.log('olptions', this.options)

        this.commandsDir = path.join(__dirname, '..', this.options.autoloadDir)

        if (this.options.autoload) {
            consola.info('Auto loading all commands from:', this.commandsDir)
            this.autoloadCommands()
            // Display loaded Commands
            this.displayLoadedCommands()
        }
    }

    async loadCommand(commandPath) {
        if (!commandPath) consola.error(new Error('"commandPath" is missing!'))

        commandPath = path.join(
            __dirname,
            commandPath.endsWith('.js') ? commandPath : commandPath + '.js',
        )

        if (!fs.existsSync(commandPath)) {
            consola.error('Command path ' + commandPath + ' does not exist.')
            process.exit(1)
        }

        const command = await import(`file://${commandPath}`).then(
            (res) => res.default,
        )

        // Store path for reloading
        command._filePath = commandPath

        this.loadCommandAsCommand(command)
    }

    loadCommandAsCommand(command) {
        if (!command) consola.error(new Error('"command" is missing!'))
        if (typeof command !== 'object') {
            consola.error(new Error('"command" must be an object!'))
        }

        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command === false || 'execute' in command === false) {
            consola.error(
                `The command at ${command._filePath} is missing a required "data" or "execute" property.`,
            )
            process.exit(1)
        }

        if (this.client.commands.has(command.data.name)) {
            consola.warn(
                chalk.yellow(
                    `Skip: Command '${command.data.name}' already registred!`,
                ),
            )
            return
        }

        // Save command in commands
        this.client.commands.set(command.data.name, command)
    }

    async autoloadCommands() {
        if (!fs.existsSync(this.commandsDir)) {
            consola.error('Commands directory does not exist.')
            process.exit(1)
        }

        const commandFolders = fs
            .readdirSync(this.commandsDir, {
                withFileTypes: true,
            })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name)

        // console.log('commandFolders:', commandFolders)

        for (const folder of commandFolders) {
            const folderPath = path.join(this.commandsDir, folder)

            // console.log('folderPath:', folderPath)

            const commandFiles = fs
                .readdirSync(folderPath)
                .filter((file) => file.endsWith('.js'))

            for (const file of commandFiles) {
                const filePath = path.join(folderPath, file)

                const command = await import(`file://${filePath}`).then(
                    (res) => res.default,
                )

                // Store path for reloading
                command._filePath = filePath

                this.loadCommandAsCommand(command)
            }
        }
    }

    async registerGuildCommands() {
        // Construct and prepare an instance of the REST module
        const rest = new REST().setToken(TOKEN)

        const commands = []

        for (const command of this.client.commands.values()) {
            commands.push(command.data.toJSON())
        }

        try {
            consola.info(
                `Started refreshing ${this.client.commands.length} application (/) commands.`,
            )

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                { body: commands },
            )

            consola.info(
                `Successfully reloaded ${data.length} application (/) commands.`,
            )
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error)
        }
    }

    displayLoadedCommands() {
        // create table
        const table = new AsciiTable3('Commands')
            .setHeading('#', 'Name', 'Message')
            .setAlign(3, AlignmentEnum.CENTER)

        let i = 1
        for (const command of this.client.commands.values()) {
            table.addRowMatrix([[i, command.data.name, chalk.green('ok')]])
            i++
        }

        console.log(table.toString())
    }
}

export default CommandHandler
