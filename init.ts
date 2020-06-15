/**
 * @file Init
 * This file logs into Discord. It also loads events, the .env file, and the Web server (if it is required)
 * Fun fact: This used to be 14 lines! {@see https://github.com/Jack5079/nxtbot/blob/bfdfd1c6aa5b4e67cc08192f59ac55ac92d40663/index.ts}
 * @author Jack <hello@5079.ml> (https://5079.ml)
 */
import { Client, Collection } from 'discord.js'
import { Bot } from './utils/types'
import {
  existsSync as exists,
  readFileSync as readFile,
  readdirSync
} from 'fs'
import { IncomingMessage, ServerResponse, createServer } from 'http'

// We need to get data from the .env file because OWNER and TOKEN are in there ( unless the user somehow does stuff like `'blahblahblah' > Env:/TOKEN`)
if (exists('./.env')) {
  // Before anything uses it, we must load the .env file (provided it exists, of course)
  process.env = {
    ...process.env, // Preserve existing env
    ...Object.fromEntries(
      // Overwrite the env with the .env file
      readFile('./.env', 'utf-8')
        .split('\n') // split the file into lines
        .filter(line => !line.startsWith('#') && line) // remove comments and spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    )
  }
}

const client = new Client as Bot // Bot is Client but with commands & aliases
// time to define them:
client.commands = new Collection // Init commands
client.aliases = new Collection // Init aliases

// Load in events
readdirSync('./events/')
  .filter(name => name.endsWith('.js'))
  .map(name => name.replace('.js', ''))
  .forEach(async (filename: any) => {
    const ev = (await import('./events/' + filename)).default
    client.on(filename, context => {
      ev.call(client, context)
    })
  })

// Make a web server if the bot is running on Glitch
// Why? Glitch requires your project to be pinged every 5 minutes.
if (process.env.PORT && process.env.PROJECT_DOMAIN) {
  console.log(
    '[PROD] Starting web server on',
    process.env.PROJECT_DOMAIN,
    'with port',
    process.env.PORT
  )
  createServer((_: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    res.write(
      `<meta http-equiv="refresh" content="0;url=${
      require('./package.json').homepage
      }">`
    )
    res.end()
  }).listen(process.env.PORT)
}

// Login to Discord
if (!process.env.TOKEN) {
  // if there's no token
  console.error('No token found. Please add it to your enviroment variables, or in your .env file.')
  client.destroy()
} else client.login(process.env.TOKEN) // login using the token from .env

export default client
