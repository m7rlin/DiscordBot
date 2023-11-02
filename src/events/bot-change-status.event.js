import { consola } from 'consola'
import { ActivityType, Events } from 'discord.js'
import { BOT_STATUS_ENABLED, BOT_STATUS_INTERVAL } from '../config'

const activities = [
    {
        type: ActivityType.Custom,
        name: 'customstatus',
        state: 'Subskrybuj m7rlin | Poradniki dla Ciebie',
    },

    {
        type: ActivityType.Playing,
        name: 'Minecraft',
        state: 'W grze od 10 minut.',
    },
    {
        type: ActivityType.Competing,
        name: 'Minecraft',
        state: 'W grze od 10 minut.',
    },
    {
        type: ActivityType.Streaming,
        name: 'MagicTM Live',
        state: 'Na żywo od 10 minut.',
        url: 'https://www.magictm.com',
    },
    {
        type: ActivityType.Watching,
        name: 'YT @m7rlin',
        state: 'Ogląda wspaniałe poradniki @m7rlin na YouTube.',
    },
]

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
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

        const status = await client.user.setActivity({
            type: ActivityType.Custom,
            name: 'customstatus',
            state: 'Subskrybuj m7rlin | Poradniki dla Ciebie',
        })
        // Change bot status
        await client.user.setStatus('online')

        // const status = await client.user.setPresence({
        //     activities: [
        //         // {
        //         //     type: ActivityType.Custom,
        //         //     name: 'customstatus',
        //         //     state: 'Subskrybuj m7rlin | Poradniki dla Ciebie',
        //         // },

        //         // {
        //         //     type: ActivityType.Playing,
        //         //     name: 'Minecraft',
        //         //     state: 'W grze od 10 minut.',
        //         // },
        //         // {
        //         //     type: ActivityType.Competing,
        //         //     name: 'Minecraft',
        //         //     state: 'W grze od 10 minut.',
        //         // },
        //         // {
        //         //     type: ActivityType.Streaming,
        //         //     name: 'MagicTM Live',
        //         //     state: 'Na żywo od 10 minut.',
        //         //     url: 'https://www.magictm.com',
        //         // },
        //         {
        //             type: ActivityType.Watching,
        //             name: 'YT @m7rlin',
        //             state: 'Ogląda wspaniałe poradniki @m7rlin na YouTube.',
        //         },
        //     ],
        //     // “idle”, “dnd”, “online”, or “offline”
        //     status: 'online',
        // })

        // console.log('status', status)

        consola.success('Status bota zmieniony pomyślnie.')
    },

    async initRefreshing(client) {
        consola.info(
            `Rozpoczęto cyklicznką zmianę statusu bota (co ${BOT_STATUS_INTERVAL} sekund).`,
        )

        let i = 0

        setInterval(() => {
            // Reset activities
            if (i >= activities.length) i = 0

            const myActivity = activities[i]

            const activity = {
                type: myActivity.type,
                name: myActivity.name,
                state: myActivity.state,
            }

            if (myActivity.type === ActivityType.Streaming) {
                activity.url = myActivity.url
            }

            client.user.setPresence({
                activities: [activity],

                status: 'online',
            })

            i++
        }, BOT_STATUS_INTERVAL * 1000)
    },
}
