import { Client, Message, Collection } from 'discord.js'
import { Bot, CommandObj } from './utils/types'
import {
  existsSync as exists,
  readFileSync as readFile,
  readdirSync
} from 'fs'
import { IncomingMessage, ServerResponse, createServer } from 'http'
import { rreaddir } from './utils/rreaddir'
import aliasFrom from './utils/alias'
import { prefixes } from './util'

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

const bot = new Client() as Bot // Bot is Client but with commands
bot.commands = new Collection<string, CommandObj>() // Init commands

// On close events
process.on('exit', bot.destroy.bind(bot))

//catches ctrl+c event
process.on('SIGINT', bot.destroy.bind(bot))

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', bot.destroy.bind(bot))
process.on('SIGUSR2', bot.destroy.bind(bot))

// The actual command loader
async function loadCommands () {
  try {
    const entries: [string, CommandObj][] = await Promise.all(
      (await rreaddir('./commands/')) // get the file names of every command in the commands folder
        .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
        .map(async file => {
          console.log(`[COMMANDS] Loading ${file}`)
          return [
            file.replace('.js', '').replace(/^.*[\\\/]/, ''), // Remove folders from the path and .js, leaving only the command name
            {
              ...(await import('./' + file)), // `run` and `desc`
              path: require.resolve('./' + file) // for stuff like reload
            }
          ]
        }) // convert filenames to commands
    ) as [string, CommandObj][]
    entries.forEach(([name, command]: [string, CommandObj]) => {
      bot.commands.set(name, command)
      command.aliases?.forEach(alias => {
        bot.commands.set(alias, aliasFrom(name))
      })
    })
  } catch (err) {
    console.log('[COMMANDS]', err.toString().split('\n')[0])
  }
}

loadCommands()

// Remember jackbot-discord? This is it now.
bot.on('message', async message => {
  // When a message is sent
  if (!message.author?.bot) {
    // no bots allowed
    const prefix: string = prefixes[message.guild?.id || ''] || '-'
    const content = message.content || ''
    const name = [...bot.commands.keys()].find(
      cmdname =>
        content.startsWith(`${prefix}${cmdname} `) || // matches any command with a space after
        content === `${prefix}${cmdname}` // matches any command without arguments
    )
    // Run the command!
    if (name) {
      const command = bot.commands.get(name)?.run || (() => { })

      try {
        const output = await command(
          message as Message, // the message
          // The arguments
          content
            .substring(prefix.length + 1 + name.length) // only the part after the command
            .split(' '), // split with spaces
          bot // The bot
        )

        if (output) message.channel?.send(output)
      } catch (err) {
        message.channel?.send({
          embed: {
            author: {
              name: `${bot.user?.username} ran into an error while running your command!`,
              iconURL: bot.user?.avatarURL()
            },
            title: err.toString(),
            footer: {
              text: 'Report this bug @ ' + require('./package.json').bugs
            }
          }
        })
      }
    }
  }
})

// Load in events
readdirSync('./events/')
  .filter(name => name.endsWith('.js'))
  .map(name => name.replace('.js', ''))
  .forEach(async (filename: any) => {
    const ev = (await import('./events/' + filename)).default
    bot.on(filename, context => {
      ev(context, bot)
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
  createServer(function (_: IncomingMessage, res: ServerResponse) {
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
  console.error('No token found. Please add it to the env')
  process.exit(1)
}
// If there is no token the above code will close the bot
bot.login(process.env.TOKEN) // login using the token from .env

export default bot
