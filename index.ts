import Bot from 'jackbot-discord'
import { readdirSync } from 'fs'
import env from './env'
const bot = new Bot({}, {
  prefix: '-'
})

bot.login(env.TOKEN)

readdirSync('./commands/', 'utf-8').filter(filename => filename.endsWith('.js')).forEach(async file => {
  bot.add(file.replace('.js', ''), (await import('./commands/' + file)).default)
})

export default bot