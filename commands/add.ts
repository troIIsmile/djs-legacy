import { Message } from 'discord.js'
import { hasPerm } from '../utils/permissions'
import { Bot, Command } from '../utils/types'

export function run (
  message: Message,
  [name, ...args]: [string, string[]],
  bot: Bot
): string {
  if (hasPerm(message)) {
    // Lets users create a new command within the app
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
      return `🎉 Created ${name}!` // tell the user
    } else return 'Uhh, you forgot the code.'
  } else return 'You are not the bot owner.'
}
export const desc = 'Adds a command to the bot, until it restarts.'
