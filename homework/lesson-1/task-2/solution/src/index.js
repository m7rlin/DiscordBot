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
    } else if (commandName === 'calc') {
        const [num1, operator, num2] = args
        const n1 = parseFloat(num1)
        const n2 = parseFloat(num2)
        let result

        switch (operator) {
            case '+':
                result = n1 + n2
                break
            case '-':
                result = n1 - n2
                break
            case '*':
                result = n1 * n2
                break
            case '/':
                result = n1 / n2
                break
            default:
                message.reply('Nieprawidłowy operator!')
                return
        }

        message.reply(`Wynik: ${result}`)
    } else {
        message.reply('Nie ma takiej komendy!')
    }
})

client.login(TOKEN)
