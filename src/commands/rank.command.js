const Canvas = require("canvas")
const Discord = require("discord.js")

module.exports = {
  name: "rank",
  description: "Display user rank.",
  guildOnly: true,
  cooldown: 1,

  async run(msg, args) {
    const userLevel = 15

    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext("2d")

    // Since the image takes time to load, you should await it
    const background = await Canvas.loadImage(
      __dirname + "./../assets/img/wallpaper.jpg",
    )

    const diamond = await Canvas.loadImage(
      __dirname + "./../assets/img/diamond.png",
    )

    // This uses the canvas dimensions to stretch the image onto the entire canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(diamond, 600, 150, 80, 80)

    ctx.font = "40px sans-serif"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(msg.member.displayName, 275, 75)

    ctx.font = "28px sans-serif"
    ctx.fillStyle = "#ffffff"
    ctx.fillText("Poziom: " + userLevel, 275, 120)

    ctx.strokeStyle = "#74037b"
    ctx.strokeRect(0, 0, canvas.width, canvas.height)

    // Avatar circle
    // ctx.beginPath()
    // ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
    // ctx.closePath()
    // ctx.clip()

    // Wait for Canvas to load the image
    const avatar = await Canvas.loadImage(
      msg.member.user.displayAvatarURL({ format: "jpg" }),
    )

    ctx.drawImage(avatar, 25, 25, 200, 200)

    // Use helpful Attachment class structure to process the file for you
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "wallpaper.jpg",
    )

    msg.channel.send("Gratulacje, kolejny poziom!", attachment)
  },
}
