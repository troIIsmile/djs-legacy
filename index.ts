import { Bot, Commands } from 'jackbot-discord'
import {
  readdirSync as readdir,
  existsSync as exists,
  readFileSync as readFile
} from 'fs'
import live from './utils/livereload'
import random from './utils/random'
import { IncomingMessage, ServerResponse, createServer } from 'http'
import fetch from 'node-fetch'

// (Most) Playing messages from esmBot
// Why?
// @TheEssem has a sense of humor, unlike me.

import { messages } from './messages'

// We need to get data from the .env file because OWNER and TOKEN are in there ( unless the user somehow does stuff like `'TOKEN=blahblahblah' > Env:/TOKEN` )
if (exists('./.env')) { // Before anything uses it, we must load the .env file (provided it exists, of course)
  process.env = {
    ...process.env,
    ...Object.fromEntries(
      readFile('./.env', 'utf-8')
        .split('\n') // split the file into lines
        .filter(line => !line.startsWith('#')) // remove comments
        .filter(Boolean) // remove spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    )
  }
}

const bot = new Bot(
  new Map(), // jackbot-discord@14 and up uses a Map instead of an Object
  {
    prefix: ['-'],
    allowbots: false
  }
)


if (!process.env.TOKEN) { // if there's no token
  console.error('No token found. Please add it to the env')
  process.exit(1)
} else bot.login(process.env.TOKEN) // login using the token from .env

// What this does is get all the commands in a directory, and adds them to the bot. ***Might*** add aliases later on
// .js is removed because of the way import/require works & that it makes it easier in the end
async function readCommandDir (folder: string): Promise<Commands> {
  const map = new Map()
  const entries = await Promise.all(
      readdir(folder) // get the file names of every command in the commands folder
        .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
        .map(filename => filename.replace('.js', '')) // remove `.js` from those
        .map(async file => [file, (await import(folder + file)).run]) // convert filenames to commands
  )
  
  entries.forEach(([name, func])=>map.set(name, func))
  return map
}

bot.on('ready', async () => {
  readCommandDir('./commands/').then(commands=>{
    bot.commands = commands
  })
  
  // activityChanger also from esmBot, also known as "the gamer code"
  ;(async function activityChanger () {
    bot.user?.setActivity(random(messages))
    setTimeout(activityChanger, 900000)
  })()
})

bot.on('warn', console.warn)

live(bot, '../commands')

if (process.env.PORT && process.env.PROJECT_DOMAIN) { // Running on glitch
  console.log('[PROD] Starting web server on', process.env.PROJECT_DOMAIN, 'with port', process.env.PORT)
  createServer(function (_: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, {
      'Content-Type': 'text-html'
    });
    res.write('<a href=https://github.com/Jack5079/nxtbot>source');
    res.end();
  }).listen(process.env.PORT);
}




export default bot