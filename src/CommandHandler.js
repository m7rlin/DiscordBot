import { Collection, REST, Routes } from 'discord.js'
import fileDirNameUtil from './utils/file-dir-name.util'
import path from 'path'
import fs from 'fs'
import chalk from 'chalk'
import { AlignmentEnum, AsciiTable3 } from 'ascii-table3'
import { CLIENT_ID, GUILD_ID, TOKEN } from './config'

const { __dirname } = fileDirNameUtil(import.meta)

class CommandHandler {
    constructor(client, options = {}) {
        this.client = client
        client.commands = new Collection()

        this.options = Object.assign(
            {
                autoload: false,
                autoloadDir: './src/commands',
            },
            options,
        )

        this.commandsDir = path.join(__dirname, '..', this.options.autoloadDir)

        if (this.options.autoload) {
            console.log('Auto loading all commands from:', this.commandsDir)

            this.autoloadCommands()
        }
    }

    async autoloadCommands() {
        if (!fs.existsSync(this.commandsDir)) {
            console.error('Commands directory does not exist!')
            process.exit(1)
        }

        const commandFolders = fs
            .readdirSync(this.commandsDir, {
                withFileTypes: true,
            })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name)

        // console.log(commandFolders)

        for (const folder of commandFolders) {
            const folderPath = path.join(this.commandsDir, folder)

            // console.log('folderPath', folderPath)

            const commandFiles = fs
                .readdirSync(folderPath)
                .filter((fileName) => fileName.endsWith('.js'))

            for (const file of commandFiles) {
                const filePath = path.join(folderPath, file)

                const command = await import(`file://${filePath}`).then(
                    (res) => res.default,
                )

                // Store path for reloading
                command._filePath = filePath

                // console.log(filePath)

                // console.log('command', command)

                this.loadCommandAsCommand(command)
            }

            // console.log(commandFiles)
        }

        this.displayLoadedCommands()
    }

    loadCommandAsCommand(command) {
        if (!command) throw new Error('"command" is missing!')
        if (typeof command !== 'object') {
            throw new Error('"command" must be an object!')
        }

        if ('data' in command == false || 'execute' in command == false) {
            console.warn(
                `The command at ${command._filePath} has missing a required "data" or "execute" property.`,
            )
            process.exit(1)
        }

        if (this.client.commands.has(command.data.name)) {
            console.warn(
                chalk.yellow(
                    `Skip: Command '${command.data.name}' is already registred!`,
                ),
            )
            return
        }

        // Save command in commands
        this.client.commands.set(command.data.name, command)
    }

    async loadCommand(commandPath) {
        if (!commandPath) throw new Error('"commandPath" is missing!')

        commandPath = path.join(
            __dirname,
            commandPath.endsWith('.js') ? commandPath : commandPath + '.js',
        )

        if (!fs.existsSync(commandPath)) {
            console.error('Command path ' + commandPath + ' does not exist.')
            process.exit(1)
        }

        const command = await import(`file://${commandPath}`).then(
            (res) => res.default,
        )

        // Store path for reloading
        command._filePath = commandPath

        this.loadCommandAsCommand(command)
    }

    displayLoadedCommands() {
        // Create table
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

    async registerGuildCommands() {
        const rest = new REST().setToken(TOKEN)

        const commands = []

        for (const command of this.client.commands.values()) {
            commands.push(command.data.toJSON())
        }

        try {
            console.log(
                `Started refreshing ${commands.length} application (/) commands.`,
            )

            const data = await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                {
                    body: commands,
                },
            )

            console.log(
                `Successfully reloaded ${data.length} application (/) commands.`,
            )
        } catch (error) {
            console.error(error)
        }
    }
}

export default CommandHandler
