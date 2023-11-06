import consola from 'consola'
import { ActivityType, Events } from 'discord.js'
import {
    BOT_STATUS_ENABLED,
    BOT_STATUS_INTERVAL,
    USER_PRESENCE_STATUS,
} from '../config'

const activities = [
    {
        name: 'Magiczna Kraina',
        type: ActivityType.Streaming,
        state: 'Start serwera mc.mgtm.pl!',
        status: USER_PRESENCE_STATUS.ONLINE,
        url: 'https://youtube.com/?watch=dgkalsdjfksl',
    },
    {
        name: 'customstatus',
        type: ActivityType.Custom,
        state: 'Subskrybuj m7rlin | Poradniki dla Ciebie',
        status: USER_PRESENCE_STATUS.ONLINE,
    },
    {
        name: 'Minecraft',
        type: ActivityType.Playing,
        state: 'W grze od 10 minut.',
        status: USER_PRESENCE_STATUS.DND,
    },
    {
        name: 'CS 2',
        type: ActivityType.Competing,
        state: 'Zaraz m7rlin pokona krisa.',
        status: USER_PRESENCE_STATUS.IDLE,
    },
]

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        // "online" "idle" "invisible" "dnd"
        // const status = await client.user.setStatus('online')

        // const status = await client.user.setActivity({
        //     name: 'Minecraft',
        //     type: ActivityType.Playing,
        //     state: 'Zostało mi pół serduszka',
        // })

        // console.log('status', status)

        if (!BOT_STATUS_ENABLED) {
            // Clear status
            client.user.setPresence({ activity: null })
            return
        }

        if (BOT_STATUS_INTERVAL > 0) {
            if (BOT_STATUS_INTERVAL < 10) {
                consola.warn(
                    `Wartość BOT_STATUS_INTERVAL = ${BOT_STATUS_INTERVAL} mniejsza od 10. Zmienianie statusu może nie działać poprawnie!`,
                )
            }
            return this.initRefreshing(client)
        }

        // Set activity index = 0
        this.setPresence(client, 0)

        consola.success('Status bota pomyślnie zmieniony.')
    },

    setPresence(client, i) {
        const myActivity = activities[i]

        const status = myActivity.status ?? 'online'

        const activity = {
            name: myActivity.name,
            type: myActivity.type,
            state: myActivity.state,
        }

        if (myActivity.type === ActivityType.Streaming) {
            activity.url = myActivity.url
        }

        client.user.setPresence({
            activities: [activity],
            status,
        })
    },

    async initRefreshing(client) {
        consola.info(
            `Rozpoczęto cyklicznką zmianę statusu bota (co ${BOT_STATUS_INTERVAL} sekund).`,
        )

        let i = 0

        setInterval(() => {
            const activityCount = activities.length

            // Reset activities
            if (i >= activityCount) i = 0

            this.setPresence(client, i)

            i++
        }, BOT_STATUS_INTERVAL * 1000)
    },
}
