import Bot from 'jackbot-discord'
import { readdirSync } from 'fs'
import { env } from './util'

const bot = new Bot({}, {
  prefix: '-'
})

bot.login(env.TOKEN) // login using the token from .env

interface Commands {
  [ key: string ]: Function
}

async function getCommandsFromFolder (folder: string): Promise<Commands> {
  async function getCommand (file: string): Promise<[ string, Function ]> {
    return [ file, (await import(folder + file)).default ]
  }

  return Object.fromEntries( // Object.fromEntries does this: [ ['hello', 2] ] -> { hello: 2 }
    await Promise.all(
      readdirSync(folder, 'utf-8') // get the file names of every command in the commands folder
        .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
        .map(filename => filename.replace('.js', '')) // remove `.js` from those
        .map(file => getCommand(file))
    )
  )
}

getCommandsFromFolder('./commands/').then(bot.add.bind(bot))