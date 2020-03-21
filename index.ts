import { Bot, Commands } from 'jackbot-discord'
import { promises as fs, existsSync, readFileSync as read } from 'fs'
import live from './utils/livereload'
import { IncomingMessage, ServerResponse, createServer } from 'http'
if (existsSync('./.env')) { // Before anything uses it, we must load the .env file (provided it exists, of course)
  process.env = {
    ...process.env,
    ...Object.fromEntries(
      read('./.env', 'utf-8')
        .split('\n') // split the file into lines
        .filter(line => !line.startsWith('#')) // remove comments
        .filter(Boolean) // remove spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    )
  }
}

const bot = new Bot({}, {
  prefix: '-',
  allowbots: false
})

if (!process.env.TOKEN) { // if there's no token
  console.error('No token found. Please add it to the env')
  process.exit(1)
} else bot.login(process.env.TOKEN) // login using the token from .env

async function readCommandDir (folder: string): Promise<Commands> {
  return Object.fromEntries( // Object.fromEntries does this: [ ['hello', 2] ] -> { hello: 2 }
    await Promise.all(
      (await fs.readdir(folder)) // get the file names of every command in the commands folder
        .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
        .map(filename => filename.replace('.js', '')) // remove `.js` from those
        .map(async file => [file, (await import(folder + file)).run]) // convert filenames to commands
    )
  )
}

bot.on('ready', () => {
  readCommandDir('./commands/').then(bot.add.bind(bot))
})

live(bot, '../commands')

if (process.env.PORT && process.env.PROJECT_DOMAIN) { // Running on glitch
  console.log('[PROD] Starting web server on', process.env.PROJECT_DOMAIN, 'with port', process.env.PORT)
  createServer(function (_: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<a href="https://github.com/Jack5079/nxtbot">this is nxt</a>');
    res.end();
  }).listen(process.env.PORT);
}


export default bot