import { consola } from 'consola'

export default {
    init: () => {
        process.on('unhandledRejection', (reason, p) => {
            consola.error(' [antiCrash] :: Unhandled Rejection/Catch')
            consola.error(reason, p)
        })
        process.on('uncaughtException', (err, origin) => {
            consola.error(' [antiCrash] :: Uncaught Exception/Catch')
            consola.error(err, origin)
        })
        process.on('uncaughtExceptionMonitor', (err, origin) => {
            consola.error(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)')
            consola.error(err, origin)
        })
    },
}
