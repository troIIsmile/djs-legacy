import { Message } from 'discord.js'
import { Bot } from './../../utils/types' // I really really need to fix this
import { hasPerm } from '../../utils/permissions'
import { MessageOptions } from 'discord.js'

export async function run (message: Message, args: string[], bot: Bot): Promise<MessageOptions> {
  if (hasPerm(message)) {
    const cmdname = (bot.commands.get(args.join(' ')) ? args.join(' ') : (bot.commands.get(bot.aliases.get(args.join(' ')) || '') ? bot.aliases.get(args.join(' ')) : '')) || ''
    if (bot.commands.get(cmdname)?.path) {
      // Remove old aliases
      if (bot.commands.get(cmdname)?.aliases) {
        bot.commands.get(cmdname)?.aliases?.forEach(Map.prototype.delete.bind(bot.aliases))
      }
      const path = bot.commands.get(cmdname)?.path! // Jesus fucking christ TypeScript I just need the path
      delete require.cache[path] // Remove require's cache so we can import the new one
      bot.commands.set(cmdname, { ...(await import(path)), path }) // Loads in a newly imported command along with the path
      // If there are aliases in the reloaded command, add them
      if (bot.commands.get(cmdname)?.aliases) {
        bot.commands.get(cmdname)?.aliases?.forEach(alias => {
          bot.aliases.set(alias, cmdname)
        })
      }
      return {
        embed: {
          author: {
            name: 'Command reloaded!',
            iconURL: bot.user?.displayAvatarURL()
          },
          color: 0x00FF00, // Checkmark green
          title: cmdname,
          description: (await import(path)).desc,
          fields: [{
            name: 'Aliases',
            value: ((await import(path)).aliases) ? ((await import(path)).aliases).join(', ') : ''
          }].filter(({value})=>value)
        }
      }
    } else return { content: '❌ That command does not exist, or was added with the add command.' }
  } else return { content: '❌ This command is for the bot owner only.' }
}
export const desc = 'Reloads a command.'
export const aliases = []
