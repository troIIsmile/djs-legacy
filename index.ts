import { Client, Message, ClientEvents } from 'discord.js'
import { Bot, Command } from './utils/types'
import {
  existsSync as exists,
  readFileSync as readFile,
  readdirSync as readdir
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
        .filter(line => !line.startsWith('#')) // remove comments
        .filter(Boolean) // remove spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    )
  }
}

const options = {
  prefix: '-'
}

const bot = new Client() as Bot
bot.commands = new Map<string, Command>()

// The actual command loader
;(async function commandLoader () {
  try {
    const entries = await Promise.all(
      readdir('./commands/') // get the file names of every command in the commands folder
        .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
        .map(async file => {
          console.log(`[COMMANDS] Loading ${file}`)
          return [
            file.replace('.js', ''),
            (await import('./commands/' + file)).run
          ]
        }) // convert filenames to commands
    )
    entries.forEach(([name, command]) => {
      bot.commands.set(name, command)
    })
  } catch (err) {
    console.log('[COMMANDS]', err.toString().split('\n')[0])
  }
})()

// Remember jackbot-discord? This is it now.
bot.on('message', message => {
  // When a message is sent
  if (!message.author?.bot) {
    // no bots allowed
    const content = message.content || ''
    const name = [...bot.commands.keys()].find(
      cmdname =>
        content.startsWith(`${options.prefix}${cmdname} `) || // matches any command with a space after
        content === `${options.prefix}${cmdname}` // matches any command without arguments
    )

    // Run the command!
    if (name) {
      const command = bot.commands.get(name) || function () {}
      const output = command(
        message as Message, // the message
        // The arguments
        content
          .substring(options.prefix.length + 1 + name.length) // only the part after the command
          .split(' '), // split with spaces
        bot // The bot
      )
      if (output) {
        if (output instanceof Promise) {
          output.then(message.channel?.send.bind(message.channel))
        } else message.channel?.send(output)
      }
    }
  }
})

// Let users find the prefix of the server
bot.on('message', message => {
  if (message.content.trim() === `<${bot.user?.id}>`) {
    message.reply('My prefix is ' + options.prefix)
  }
})

readdir('./events/')
  .filter(name => name.endsWith('.js'))
  .map(name => name.replace('.js', ''))
  .forEach(async (filename: any) => {
    const ev = (await import('./events/' + filename)).default
    bot.on(filename, context => {
      ev(context, bot)
    })
  })

if (process.env.PORT && process.env.PROJECT_DOMAIN) {
  // Running on glitch
  console.log(
    '[PROD] Starting web server on',
    process.env.PROJECT_DOMAIN,
    'with port',
    process.env.PORT
  )
  createServer(function (_: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, {
      'Content-Type': 'text-html'
    })
    res.write(
      `<meta http-equiv="refresh" content="0;url=${
        require('./package.json').homepage
      }">`
    )
    res.end()
  }).listen(process.env.PORT)
}

if (!process.env.TOKEN) {
  // if there's no token
  console.error('No token found. Please add it to the env')
  process.exit(1)
} else bot.login(process.env.TOKEN) // login using the token from .env

export default bot
