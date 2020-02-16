# DiscordBot
Projekt oparty na serii poradników z mojego kanału YouTube o tym jak stworzyć własnego discordowego bota.

## Spis treści

- Co muszę wiedzieć?
- Jakie programy potrzebuję?
- Instalacja

## Co muszę wiedzieć?

Powinieneś znać podstawy javascript. Podczas tworzenia bota używam z nowoczesnego javascriptu jak ES6.

## Jakie programy potrzebuję?

- Edytor tekstu albo IDE — Sublime Text 3, Visual Studio Code *(tego używam)*
- Zainstalowany serwer Node JS

## Instalacja

> Więcej informacji można znaleść w mojej serii na platformie YouTube. https://www.youtube.com/m7rlin

Pobierz albo sklonuj repozytorium.

Zainstaluj paczki.

`$ npm install`

## Użycie

1. Dostosuj plik `src/config/config.js` do swoich potrzeb.

```javascript
...
module.exports = {
  token: process.env.token,
  prefix: "!",
}
```

`prefix` — prefix dla kommend, na które reaguje bot

2. Strwórz plik `.env` i ustaw zmienne środowiskowe.

```
TOKEN=___TWOJ_TOKEN_TUTAJ___
```

`TOKEN` — twój token bota (powinnien zawsze być prywatny)

## Licencja

MIT
