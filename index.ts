import { Bot, Commands } from 'jackbot-discord'
import { promises as fs, existsSync, watch } from 'fs'
if (existsSync('./.env')) {
  require('./loadenv')
}

const bot = new Bot({}, {
  prefix: '-',
  allowbots: true
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
        .map(async file => [ file, (await import(folder + file)).run ]) // convert filenames to commands
    )
  )
}

bot.on('ready', () => {
  readCommandDir('./commands/').then(bot.add.bind(bot))
})

watch('./commands/', {}, async (type: string, filename: string) => {
  if (filename.endsWith('.js')) {
    if (type === 'change') {
      filename = filename.replace('.js', '')
      delete require.cache[ require.resolve(`./commands/${filename}.js`) ]
      bot.remove(filename)
      bot.add(filename, (await import(`./commands/${filename}.js`)).run)
    } else {
      if (existsSync('./commands/${filename}') && filename.endsWith('.js')) {
        bot.add(filename.replace('.js', ''), (await import(`./commands/${filename}`)).run)
      } else if (filename.endsWith('.js')) {
        filename = filename.replace('.js', '')
        bot.remove(filename)
      }
    }
  }
})

export default bot
