const Discord = require("discord.js")
const client = new Discord.Client()

client.on("ready", () => {
  console.log("Lubie ciasteczka!")
  console.log(`Zalogowano jako ${client.user.tag}!`)
})

client.on("message", (msg) => {
  if (msg.content === "ping") {
    msg.reply("Pong!")
  }
})

client.login("___YOUR_BOT_TOKEN_HERE___")
