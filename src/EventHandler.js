import path from 'path'
import fileNameDirUtil from './utils/file-dir-name.util'
import fs from 'fs'
import chalk from 'chalk'

const { __dirname } = fileNameDirUtil(import.meta)

class EventHandler {
    constructor(client) {
        this.client = client

        this.loadEvents()
    }

    async loadEvents() {
        const eventsDir = path.join(__dirname, 'events')

        // console.log(eventsDir)

        if (!fs.existsSync(eventsDir)) {
            console.error(chalk.red('ERROR: Events directory does not exist.'))
            return
        }

        const eventFiles = fs
            .readdirSync(eventsDir)
            .filter((file) => file.endsWith('.js'))

        // console.log(eventFiles)

        for (const file of eventFiles) {
            // console.log('file', file)

            const filePath = path.join(eventsDir, file)

            // console.log('filePath', filePath)

            const event = await import(`file://${filePath}`).then(
                (res) => res.default,
            )

            const eventName = event.name

            // console.log('eventName', eventName)

            if (!event.execute || typeof event.execute !== 'function') {
                console.error(
                    chalk.red(
                        `ERROR: Event '${eventName}' has missing execute function in '${filePath}'.`,
                    ),
                )
                return
            }

            if (event.once) {
                this.client.once(eventName, (...args) => event.execute(...args))
            } else {
                this.client.on(eventName, (...args) => event.execute(...args))
            }
        }
    }
}

export default EventHandler
