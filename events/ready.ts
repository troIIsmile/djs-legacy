import { Bot, CommandObj } from '../utils/types'
import random from '../utils/random'
// Some "Playing" messages from esmBot
import { all } from '../messages'
import { rreaddir } from '../utils/rreaddir'
async function activityChanger (this: Bot) {
  // activityChanger from esmBot, also known as "the gamer code"
  this.user?.setActivity(random(all))
  setTimeout(() => activityChanger.call(this), 900000)
}

// This function gets all commands in the commands folder and adds them (& their aliases!) to the bot
export default async function (this: Bot) {
  activityChanger.call(this)
  const files = await rreaddir('./commands/')
  let count = 0
  const entries: [string, CommandObj][] = await Promise.all(
    files // get the file names of every command in the commands folder
      .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
      .map(async file => {
        return [
          file.replace('.js', '').replace(/^.*[\\\/]/, ''), // Remove folders from the path and .js, leaving only the command name
          {
            desc: 'A command without a description', // this will be overwritten by the real description if it is there
            ...(await import(`../${file}`)), // `run` and `desc`
            path: require.resolve('../' + file) // for stuff like reload
          }
        ]
      }) // convert filenames to commands
  ) as [string, CommandObj][]
  entries.forEach(([name, command]: [string, CommandObj]) => {
    this.commands.set(name, command)
    const dec = ++count / entries.length
    console.log(`[${'█'.repeat(dec * 10).padEnd(10)}]`, 'Loading commands...', `(${dec * 100}% complete)`)
    command.aliases?.forEach(alias => {
      this.aliases.set(alias, name)
    })
  })
}
