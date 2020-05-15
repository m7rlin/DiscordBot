const { readdirSync } = require("fs")
const chalk = require("chalk")

const {
  Constants: { Events },
} = require("discord.js")

const serverEvents = Object.values(Events)

// Load server events
const serverEventsPath = "/events"

module.exports = (client) => {
  const events = readdirSync(
    __dirname + `/..${serverEventsPath}`,
  ).filter((file) => file.endsWith(".js"))

  let registeredEventsCount = 0

  for (const file of events) {
    const event = require(__dirname + `/../events/${file}`)

    if (!event.run) {
      console.log(`Event '${file}' missing run().`)
      // Stop app
      process.exit(1)
    } else if (typeof event.run !== "function") {
      console.log(`Event '${file}' property 'run' must be a function.`)
      // Stop app
      process.exit(1)
    }

    if (serverEvents.includes(event.name)) {
      // Register event
      client.on(event.name, event.run)
      registeredEventsCount++
    } else {
      console.log(
        chalk.redBright(`Event '${event.name}' in '${file}' doesn't exist.`),
      )
      // Stop app
      process.exit(1)
    }
  }
  console.log(chalk.blueBright(`Registered ${registeredEventsCount} event(s).`))

  // Display all event files
  // console.log(events)
}
