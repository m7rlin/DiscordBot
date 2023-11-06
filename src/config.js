import 'dotenv/config'

// APP
export const TOKEN = process.env.TOKEN
export const CLIENT_ID = process.env.CLIENT_ID
export const GUILD_ID = process.env.GUILD_ID
export const BOT_INVITE_LINK = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=bot+applications.commands&permissions=8`

// BOT STATUS
export const BOT_STATUS_ENABLED =
    process.env.BOT_STATUS_ENABLED === 'true' || false
// (seconds) shound't be less then 10 seconds
// 0 = disabled
export const BOT_STATUS_INTERVAL =
    parseInt(process.env.BOT_STATUS_INTERVAL) || 0

// COMMANDS CONFIG
export const DEFAULT_COMMAND_COOLDOWN =
    process.env.DEFAULT_COMMAND_COOLDOWN || 3

// COMMANDS
export const COMMAND_BAN_BAN_ONLY_MEMBERS = false

// EMBED
export const EMBED_FOOTER_TEXT = '© m7rlin | Poradniki dla Ciebie'

// COLORS
export const COLORS = {
    PRIMARY: 0xa78bfa,
    DANGER: 0xf87171,
    WARNING: 0xfacc15,
    SUCCESS: 0x4ade80,
    INFO: 0x60a5fa,
    PURPLE: 0xc084fc,
    ROSE: 0xfb7185,
    PINK: 0xf472b6,
    FUCHSIA: 0xe879f9,
    VIOLET: 0xa78bfa,
    INDIGO: 0x818cf8,
}

// DATE TIME
export const FORMAT_DATE = 'D MMMM YYYY'
export const FORMAT_DATETIME = 'D MMMM YYYY hh:mm:ss'

// USER PRESENCE STATUS
export const USER_PRESENCE_STATUS = {
    ONLINE: 'online',
    IDLE: 'idle',
    INVISIBLE: 'invisible',
    DND: 'dnd',
}
