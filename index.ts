import { Bot, Commands, Command } from 'jackbot-discord'
import { readdirSync } from 'fs'
import { env } from './util'

const bot = new Bot({}, {
  prefix: '-'
})

if (!env.TOKEN) { // if there's no token
  console.error('No token found. Please add it to the .env')
  process.exit(1)
} else bot.login(env.TOKEN) // login using the token from .env

async function readCommandDir (folder: string): Promise<Commands> {
  async function fileToCommand (file: string): Promise<[ string, Command ]> {
    return [ file, (await import(folder + file)).default ]
  }

  return Object.fromEntries( // Object.fromEntries does this: [ ['hello', 2] ] -> { hello: 2 }
    await Promise.all(
      readdirSync(folder, 'utf-8') // get the file names of every command in the commands folder
        .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
        .map(filename => filename.replace('.js', '')) // remove `.js` from those
        .map(fileToCommand) // convert filenames to commands
    )
  )
}

readCommandDir('./commands/').then(bot.add.bind(bot))

export default bot
