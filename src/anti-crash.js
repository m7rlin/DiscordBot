import chalk from 'chalk'

// Preventing the bot from crashing
export default {
    init: () => {
        process.on('unhandledRejection', (reason, promise) => {
            console.log(chalk.red(' [antiCrash] :: Unhandled Rejection/Catch'))
            console.log('Rejection at:', promise, 'Reason:', reason)
        })
        process.on('uncaughtException', (err, origin) => {
            console.log(chalk.red(' [antiCrash] :: Uncaught Exception/Catch'))
            console.log('Exception at:', origin, 'Reason:', err)
        })
        process.on('uncaughtExceptionMonitor', (err, origin) => {
            console.log(
                chalk.red(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)'),
            )
            console.log('Uncaught Exception/Catch at:', origin, 'Reason:', err)
        })
    },
}
