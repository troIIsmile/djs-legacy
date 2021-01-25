import { Bot, CommandObj } from '../utils/types'
// Some "Playing" messages from esmBot
import { all } from '../messages'
import { rreaddir } from '../utils/rreaddir'
import { basename, join } from "path"

async function activityChanger (this: Bot) {
  // activityChanger from esmBot, also known as "the gamer code"
  this.client.user?.setActivity(all.random())
  setTimeout(() => activityChanger.call(this), 900000)
}

// This function gets all commands in the commands folder and adds them (& their aliases!) to the bot

export default async function (this: Bot) {
  activityChanger.call(this)
  const files = await rreaddir('./commands/')
  const entries: [string, CommandObj][] = await Promise.all(
    files
      .filter(filename => filename.endsWith('.js')) // only compiled javascript
      .map(async (file): Promise<[string, CommandObj]> => [
        basename(file, '.js'), // the name of a command is the file's name minus extension
        {
          ...(await import(join(process.cwd(),file))),
          path: require.resolve(join(process.cwd(),file))
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
