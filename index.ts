import Bot from 'jackbot-discord'
import { readdirSync } from 'fs'
import env from './env'

async function getCommand (file: string): Promise<[ string, Function ]> {
  return [ file, (await import('./commands/' + file)).default ]
}

const bot = new Bot({}, {
  prefix: '-'
});

(async () => {
  bot.add(Object.fromEntries( // Object.fromEntries does this: [['hello', 2]] -> {hello:2}
    await Promise.all(
      readdirSync('./commands/', 'utf-8') // get the file names of every command in the commands folder
        .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
        .map(filename => filename.replace('.js', '')) // remove `.js` from those
        .map(file => getCommand(file)))
  ))
})()

bot.login(env.TOKEN) // login using the token from .env
