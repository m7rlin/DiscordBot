import fs from 'fs'
import path from 'path'
import fileDirName from './utils/file-dir-name.util'
import { consola } from 'consola'

const { __dirname } = fileDirName(import.meta)

class EventHandler {
    constructor(client) {
        this.client = client

        this.loadEvents()
    }

    async loadEvents() {
        const eventsDir = path.join(__dirname, 'events')

        if (!fs.existsSync(eventsDir)) {
            consola.error('Events directory does not exist.')
            return
        }

        const eventFiles = fs
            .readdirSync(eventsDir)
            .filter((file) => file.endsWith('.js'))

        for (const file of eventFiles) {
            const filePath = path.join(eventsDir, file)
            const event = await import(`file://${filePath}`).then(
                (res) => res.default,
            )
            const eventName = event.name

            if (event.once) {
                this.client.once(eventName, (...args) => event.execute(...args))
            } else {
                this.client.on(eventName, (...args) => event.execute(...args))
            }
        }
    }
}

export default EventHandler
