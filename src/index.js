const { Client, GatewayIntentBits } = require('discord.js')

const { TOKEN, CLIENT_ID } = require('./config')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
})

client.on('ready', () => {
    console.log(`Zalogowano jako ${client.user.tag}!`)
})

client.on('messageCreate', (message) => {
    if (message.author.bot) return

    message.reply('Hej, oto twoja wiadomość: ' + message.content)
})

client.login(TOKEN)
