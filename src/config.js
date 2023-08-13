import 'dotenv/config'

export const TOKEN = process.env.TOKEN
export const CLIENT_ID = process.env.CLIENT_ID
export const GUILD_ID = process.env.GUILD_ID
export const DEFAULT_COMMAND_COOLDOWN =
    process.env.DEFAULT_COMMAND_COOLDOWN || 3
