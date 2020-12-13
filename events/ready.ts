import { Bot, CommandObj } from '../utils/types'
// Some "Playing" messages from esmBot
import { all } from '../messages'
import { rreaddir } from '../utils/rreaddir'
import { basename } from "path"

async function activityChanger (this: Bot) {
  // activityChanger from esmBot, also known as "the gamer code"
  this.user?.setActivity(all.random())
  setTimeout(() => activityChanger.call(this), 900000)
}

// This function gets all commands in the commands folder and adds them (& their aliases!) to the bot
export default async function (this: Bot) {
  activityChanger.call(this)
  const files = await rreaddir('./commands/')
  const entries: [string, CommandObj][] = await Promise.all(
    files // get the file names of every command in the commands folder
      .filter(filename => filename.endsWith('.js')) // only ones with `.js` at the end
      .map(async (file): Promise<[string, CommandObj]> => [
        basename(file, '.js'), // Remove folders from the path and .js, leaving only the command name
        {
          help: 'A command without a description', // this will be overwritten by the real description if it is there
          ...(await import(`${process.cwd()}/${file}`)),
          path: require.resolve(`${process.cwd()}/${file}`)
        }
      ]) // convert filenames to commands
  )

  entries.forEach(([name, command]) => {
    this.commands.set(name, command)
    command.aliases?.forEach(alias => {
      this.aliases.set(alias, name)
    })
  })
}
