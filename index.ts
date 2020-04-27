import { Bot } from 'jackbot-discord' 
import {
  existsSync as exists,
  readFileSync as readFile,
  readdirSync as readdir
} from 'fs'
import { IncomingMessage, ServerResponse, createServer } from 'http'

// We need to get data from the .env file because OWNER and TOKEN are in there ( unless the user somehow does stuff like `'blahblahblah' > Env:/TOKEN`)
if (exists('./.env')) { // Before anything uses it, we must load the .env file (provided it exists, of course)
  process.env = {
    ...process.env, // Preserve existing env
    ...Object.fromEntries( // Overwrite the env with the .env file
      readFile('./.env', 'utf-8')
        .split('\n') // split the file into lines
        .filter(line => !line.startsWith('#')) // remove comments
        .filter(Boolean) // remove spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    )
  }
}

// Pretty soon, I'll merge jackbot-discord into NXTBOT. I haven't done that yet, so "-" is the prefix.
const bot = new Bot(new Map(), { // jackbot-discord@14 and up uses a Map instead of an Object for commands
    prefix: ['-'], 
    allowbots: false
})

readdir('./events/')
  .filter(name => name.endsWith('.js'))
  .map(name => name.replace('.js', ''))
  .forEach(async filename => {
    const ev = (await import('./events/' + filename)).default
    bot.on(filename, context => {
      ev(context, bot)
    })
  })

if (process.env.PORT && process.env.PROJECT_DOMAIN) { // Running on glitch
  console.log('[PROD] Starting web server on', process.env.PROJECT_DOMAIN, 'with port', process.env.PORT)
  createServer(function (_: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, {
      'Content-Type': 'text-html'
    });
    res.write(`<meta http-equiv="refresh" content="0;url=${require('./package.json').homepage}">`);
    res.end();
  }).listen(process.env.PORT);
}

if (!process.env.TOKEN) { // if there's no token
  console.error('No token found. Please add it to the env')
  process.exit(1)
} else bot.login(process.env.TOKEN) // login using the token from .env

export default bot