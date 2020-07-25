import { Message } from 'discord.js'
import { Bot } from '../../utils/types' // I really really need to fix this
import { hasPerm } from '../../utils/permissions'
import { MessageOptions } from 'discord.js'

export async function run (this: Bot, message: Message, args: string[],): Promise<MessageOptions> {
  if (hasPerm(message)) {
    const cmdname = (this.commands.get(args.join(' ')) ? args.join(' ') : (this.commands.get(this.aliases.get(args.join(' ')) || '') ? this.aliases.get(args.join(' ')) : '')) || ''
    if (this.commands.get(cmdname)?.path) {
      // Remove the command's aliases
      if (this.commands.get(cmdname)?.aliases) {
        this.commands.get(cmdname)?.aliases?.forEach(Map.prototype.delete.bind(this.aliases))
      }

      // Actually reload the command
      const path = this.commands.get(cmdname)?.path! // Jesus fucking christ TypeScript I just need the path
      delete require.cache[path] // Remove require's cache so we can import the new one
      this.commands.set(cmdname, { ...(await import(path)), path }); // Loads in a newly imported command along with the path
      
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
          }].filter(({value})=>value)
        }
      }
    } else return { content: '❌ That command does not exist!' }
  } else return { content: '❌ This command is for the bot owner only.' }
}
export const help = 'Reloads a command.'
export const aliases = []
