import { consola } from 'consola'
import { ActivityType, Events } from 'discord.js'
import { BOT_STATUS_ENABLED, BOT_STATUS_INTERVAL } from '../config'

export default {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        if (!BOT_STATUS_ENABLED) return

        if (BOT_STATUS_INTERVAL > 0) {
            return this.initRefreshing(client)
        }

        // const status = await client.user.setActivity({
        //     type: ActivityType.Custom,
        //     name: 'customstatus',
        //     state: 'Subskrybuj m7rlin | Poradniki dla Ciebie',
        // })
        // // Change bot status
        // await client.user.setStatus('dnd')

        const status = await client.user.setPresence({
            activities: [
                // {
                //     type: ActivityType.Custom,
                //     name: 'customstatus',
                //     state: 'Subskrybuj m7rlin | Poradniki dla Ciebie',
                // },

                // {
                //     type: ActivityType.Playing,
                //     name: 'Minecraft',
                //     state: 'W grze od 10 minut.',
                // },
                // {
                //     type: ActivityType.Competing,
                //     name: 'Minecraft',
                //     state: 'W grze od 10 minut.',
                // },
                // {
                //     type: ActivityType.Streaming,
                //     name: 'MagicTM Live',
                //     state: 'Na żywo od 10 minut.',
                //     url: 'https://www.magictm.com',
                // },
                {
                    type: ActivityType.Watching,
                    name: 'YT @m7rlin',
                    state: 'Ogląda wspaniałe poradniki @m7rlin na YouTube.',
                },
            ],
            // “idle”, “dnd”, “online”, or “offline”
            status: 'online',
        })

        // console.log('status', status)

        consola.success('Status bota zmieniony pomyślnie.')
    },

    async initRefreshing() {},
}
