# DiscordBot

Discord Bot — Clock — YouTube tutorial series about creating own Discord bot with `discord.js` library.

## Table of contents

- What should I know before starting?
- What programs do I need?
- Installation

## What should I know before starting?

You should know javascript fundamentals. I'm using modern javascript specification like ES6.

## What programs do I need?

- Text editor or IDE — Sublime Text 3, Visual Studio Code *(i'm using it)*
- Node JS server installed

## Installation

> More informations you can find on my youtube series. https://www.youtube.com/m7rlin

Download or clone repository. 

Install packages.

`$ npm install`

## Usage

1. Customize `src/config/config.js` file to fit your needs.
```javascript
...
module.exports = {
  token: process.env.token,
  prefix: "!",
}
```

`prefix` — your bot command prefix

2. Create `.env` file and set environment variables.

```
TOKEN=___YOUR_TOKEN_HERE___
```

`TOKEN` — your bot token (should always be private)

## License

MIT
