import 'dotenv/config' // Load the .env file
import Bot from 'jackbot-discord'
import { readdirSync } from 'fs'
const bot = new Bot({}, {
  prefix: '-'
})

bot.login(process.env.TOKEN)

readdirSync('./commands/', 'utf-8').filter(filename => filename.endsWith('.js')).forEach(async file => {
  bot.add(file.replace('.js', ''), (await import('./commands/' + file)).default)
})

export default bot