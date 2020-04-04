import { Bot, Commands } from 'jackbot-discord'
import random from '../utils/random'
import live from '../utils/livereload'
import { readdirSync as readdir } from 'fs'
// (Most) Playing messages from esmBot
// Why?
// @TheEssem has a sense of humor, unlike me.
// I've refactored the list (Adding categories and song authors and stuff) and probably put more time into working on the messages than him

import { all as playingWith } from '../messages'

// What this does is get all the commands in a directory, and adds them to the bot. ***Might*** add aliases later on
async function readCommandDir (folder: string): Promise<Commands> {
  const map = new Map()
  // try {
    const entries = Object.fromEntries(await Promise.all(
        readdir(folder) // get the file names of every command in the commands folder
          .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
          .map(async file => {
            console.log(`[COMMANDS] Loading ${file}`)
            return [file.replace('.js', ''), (await import(folder + file)).run]
          }) // convert filenames to commands
    ))
    
    entries.forEach(map.set.bind(map))
  // } catch (err) {
  //   console.log('[COMMANDS]', err.toString().split('\n')[0])
  // }
  return map
}
export default (_: void, bot: Bot) => {
  readCommandDir('./commands/').then(commands=>{
    bot.commands = commands
  })
  
  live(bot, '../commands')
  // activityChanger from esmBot, also known as "the gamer code"
  ;(async function activityChanger () {
    bot.user?.setActivity(random(playingWith))
    setTimeout(activityChanger, 900000)
  })()
}