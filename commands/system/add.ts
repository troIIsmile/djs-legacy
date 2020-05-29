import { Message, MessageOptions } from 'discord.js'
import { hasPerm } from '../../utils/permissions'
import { Bot, Command } from '../../utils/types'

export function run (
  message: Message,
  args: string[],
  bot: Bot
): MessageOptions {
  if (hasPerm(message)) {
    const name = Math.random().toString(36).substr(2)
    if (args.length) {
      const run = new Function(
        'message',
        'args',
        'bot',
        args.join(' ')
      ) as Command
      bot.commands.set(name, {
        run,
        desc: 'Made with the -add command.'
      }) // make a command with the arguments that are left
      return {
        embed: {
          title: 'Created your command!',
          fields: [{
              name: 'Name',
              value: name
            }]
        }
      }
    } else return { content: 'Uhh, you forgot the code.' }
  } else return { content: 'You are not the bot owner.' }
}
export const desc = 'Adds a command to the bot, until it restarts.'
