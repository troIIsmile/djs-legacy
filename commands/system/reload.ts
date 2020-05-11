import { Message } from 'discord.js'
import { Bot } from './../../utils/types' // I really really need to fix this
import { hasPerm } from '../../utils/permissions'
import aliasFrom from '../../utils/alias'

export async function run (message: Message, args: string[], bot: Bot) {
  if (hasPerm(message)) {
    if (bot.commands.get(args.join(' '))?.path) {
      // Remove old aliases
      if (bot.commands.get(args.join(' '))?.aliases) {
        bot.commands.get(args.join(' '))?.aliases?.forEach(bot.commands.delete.bind(bot.commands))
      }
      const path = bot.commands.get(args.join(' '))?.path! // Jesus fucking christ TypeScript
      delete require.cache[path]
      bot.commands.set(args.join(' '), { ...(await import(path)), path })
      if (bot.commands.get(args.join(' '))?.aliases) {
        bot.commands.get(args.join(' '))?.aliases?.forEach(alias => {
          bot.commands.set(alias, aliasFrom(args.join(' ')))
        })
      }
      return {
        embed: {
          author: {
            name: 'Command reloaded!',
            iconURL: bot.user?.displayAvatarURL()
          },
          color: 0x00FF00, // Checkmark green
          title: args.join(' '),
          description: (await import(path)).desc
        }
      }
    } else return '❌ That command does not exist, or is an alias.'
  } else return '❌ This command is for the bot owner only.'
}
export const desc = 'Reloads a command.'
