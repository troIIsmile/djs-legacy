/**
 * @file core
 * This file logs into Discord. It also loads commands, events, the .env file, aliases, and the Web server (if it is required)
 * @author Jack <hello@5079.ml> (https://5079.ml)
 */
import { Client, Collection } from 'discord.js'
import { Bot, CommandObj } from './utils/types'
import {
  existsSync as exists,
  readFileSync as readFile,
  readdirSync
} from 'fs'
import { IncomingMessage, ServerResponse, createServer } from 'http'
import { rreaddir } from './utils/rreaddir'

// We need to get data from the .env file because OWNER and TOKEN are in there ( unless the user somehow does stuff like `'blahblahblah' > Env:/TOKEN`)
if (exists('./.env')) {
  // Before anything uses it, we must load the .env file (provided it exists, of course)
  process.env = {
    ...process.env, // Preserve existing env
    ...Object.fromEntries(
      // Overwrite the env with the .env file
      readFile('./.env', 'utf-8')
        .split('\n') // split the file into lines
        .filter(line => !line.startsWith('#')) // remove comments
        .filter(Boolean) // remove spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    )
  }
}

const bot = new Client() as Bot // Bot is Client but with commands & aliases
// time to define them:
bot.commands = new Collection<string, CommandObj>() // Init commands
bot.aliases = new Collection<string, string>() // Init aliases

// This function gets all commands in the commands folder and adds them (& their aliases!) to the bot
async function loadCommands () {
    const entries: [string, CommandObj][] = await Promise.all(
      (await rreaddir('./commands/')) // get the file names of every command in the commands folder
        .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
        .map(async file => {
          console.log(`[COMMANDS] Loading ${file}`)
          return [
            file.replace('.js', '').replace(/^.*[\\\/]/, ''), // Remove folders from the path and .js, leaving only the command name
            {
              desc: 'A command without a description', // this will be overwritten by the real description if it is there
              ...(await import(`./${file}`)), // `run` and `desc`
              path: require.resolve('./' + file) // for stuff like reload
            }
          ]
        }) // convert filenames to commands
    ) as [string, CommandObj][]
    entries.forEach(([name, command]: [string, CommandObj]) => {
      bot.commands.set(name, command)
      command.aliases?.forEach(alias => {
        bot.aliases.set(alias, name)
      })
    })
}

loadCommands()

// Load in events
readdirSync('./events/')
  .filter(name => name.endsWith('.js'))
  .map(name => name.replace('.js', ''))
  .forEach(async (filename: any) => {
    const ev = (await import('./events/' + filename)).default
    bot.on(filename, context => {
      ev.call(bot, context)
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
  bot.destroy()
} else bot.login(process.env.TOKEN) // login using the token from .env

export default bot
