import { Message } from 'discord.js'
import { Bot } from './../../utils/types' // I really really need to fix this
import { hasPerm } from '../../utils/permissions'
export async function run (message: Message, args: string[], bot: Bot) {
  if (hasPerm(message)) {
    if (bot.commands.get(args.join(' '))?.path) {
      const path = bot.commands.get(args.join(' '))?.path! // Jesus fucking christ TypeScript
      delete require.cache[path]
      bot.commands.set(args.join(' '), { ...(await import(path)), path })
      return {
        embed: {
          author: {
            name: 'Command reloaded!'
          },
          title: args.join(' '),
          description: (await import(path)).desc
        }
      }
    } else return '❌ That command does not exist!'
  } else return '❌ This command is for the bot owner only.'
}
export const desc = 'Reloads a command.'
