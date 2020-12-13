import { Message } from 'discord.js'
import { Bot } from '../../utils/types'
import { MessageOptions } from 'discord.js'
import { getCommandName } from "../../utils/parse"

export async function run (this: Bot, message: Message, args: string[],): Promise<MessageOptions | string> {
  if (message.author.id !== process.env.OWNER) return '❌ This command is for the bot owner only.'
  const cmdname = getCommandName(this, args.join(' '))
  if (!cmdname) return '❌ That command does not exist!' 

  // Remove cache and aliases
  const path = this.commands.get(cmdname)?.path! // Jesus fucking christ TypeScript I just need the path
  delete require.cache[path]
  if (this.commands.get(cmdname)?.aliases) {
    this.commands.get(cmdname)?.aliases?.forEach(Map.prototype.delete.bind(this.aliases))
  }

  // Load the command
  this.commands.set(cmdname, { ...(await import(path)), path })

  // Add the aliases back
  if (this.commands.get(cmdname)?.aliases) {
    this.commands.get(cmdname)?.aliases?.forEach(alias => {
      this.aliases.set(alias, cmdname)
    })
  }

  return {
    embed: {
      author: {
        name: 'Command reloaded!',
        iconURL: this.user?.displayAvatarURL()
      },
      color: 'GREEN',
      title: cmdname,
      description: (await import(path)).desc,
      fields: [{
        name: 'Aliases',
        value: ((await import(path)).aliases) ? ((await import(path)).aliases).join(', ') : ''
      }].filter(({ value }) => value)
    }
  }
}
export const help = 'Reloads a command.'
export const aliases = []
