import Bot from 'jackbot-discord'
import { readdirSync } from 'fs'
import env from './env'
const bot = new Bot({}, {
  prefix: '-'
})

bot.login(env.TOKEN) // login using the token from .env

readdirSync('./commands/', 'utf-8') // get the file names of every command in the commands folder
  .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
  .map(filename => filename.replace('.js', '')) // remove `.js` from those
  .forEach(async file => { // for every filename
    bot.add(file, (await import('./commands/' + file)).default)
  })

export default bot