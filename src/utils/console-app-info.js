import chalk from 'chalk'
import { readFileSync } from 'fs'

const packageJSON = JSON.parse(readFileSync('./package.json'))

export default () => {
    console.log('==========================================\n')
    console.log(chalk.blue('App is starting...'))
    console.log(
        chalk.blueBright('Author'),
        chalk.magentaBright(packageJSON.author),
        chalk.blueBright('v' + packageJSON.version),
    )
    console.log('\n==========================================\n')
}
