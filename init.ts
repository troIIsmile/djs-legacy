import { Client, Collection, Intents } from 'discord.js'
import { Bot } from './utils/types'
import {
  existsSync as exists,
  readFileSync as readFile,
  readdirSync
} from 'fs'
import { ServerResponse, createServer } from 'http'
globalThis.fetch = require('node-fetch') // shit workaround in case i missed anything
globalThis.Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)]
}

// dotenv support
if (exists('./.env')) {
  Object.assign(process.env,
    Object.fromEntries(
      // Overwrite the env with the .env file
      readFile('./.env', 'utf-8')
        .split('\n') // split the file into lines
        .filter(line => !line.startsWith('#') && line) // remove comments and spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    ))
}

const client = new Client({
  ws: {
    intents: [Intents.NON_PRIVILEGED]
  }
}) as Bot // Bot is Client but with commands & aliases
// time to define them:
client.commands = new Collection // Init commands
client.aliases = new Collection // Init aliases

// replit redirect
if (process.env.REPLIT_DB_URL) {
  createServer((_, res: ServerResponse) => {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(
      `<meta http-equiv="refresh" content="0;url=${require('./package.json').homepage}">`
    )
    res.end()
  }).listen(8080)
}

// Load in events
readdirSync('./events/')
  .filter(name => name.endsWith('.js'))
  .map(name => name.replace('.js', ''))
  .forEach(async filename => {
    const ev = (await import('./events/' + filename)).default
    client.on(filename, context => {
      ev.call(client, context)
    })
  })

// Login to Discord
client.login(process.env.TOKEN)

export default client
