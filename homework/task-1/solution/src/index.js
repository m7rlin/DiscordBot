const { Client, GatewayIntentBits } = require('discord.js')

const { TOKEN, CLIENT_ID } = require('./config')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

const PREFIX = '!'

client.on('ready', () => {
    console.log(`Zalogowano jako ${client.user.tag}!`)
})

client.on('messageCreate', (message) => {
    // Bot message
    if (message.author.bot) return

    // Ignore messages without prefix
    if (!message.content.startsWith(PREFIX)) return

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()

    console.log(commandName, args)

    if (commandName === 'info') {
        message.reply('Nazna komendy: ' + commandName)
        message.reply('Argumenty: ' + args)
    } else if (commandName === 'ping') {
        message.reply('Pong!')
        // ================================================= //
        //                                                   //
        //        Here's some code to get you started:       //
        //                                                   //
        // ================================================= //
    } else if (commandName === 'roll') {
        const maxNumber = parseInt(args[0])
        if (isNaN(maxNumber)) {
            message.reply('Invalid argument. Please enter a number.')
        } else {
            const randomNumber = Math.floor(Math.random() * maxNumber) + 1
            message.reply('You rolled a ' + randomNumber)
        }
    } else {
        message.reply('Nie ma takiej komendy!')
    }
})

client.login(TOKEN)
