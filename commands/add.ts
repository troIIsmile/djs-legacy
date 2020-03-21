import { Bot, Message, Command } from 'jackbot-discord'
import { hasPerm } from '../utils/permissions'

export async function run (message: Message, args: string[], bot: Bot): Promise<void> {
  if (hasPerm(message)) {
    // Lets users create a new command within the app
    if (args.length) {
      const name = args[ 0 ] // record the name before we remove it
      args.shift() // remove the name
      const func = new Function('message', 'args', 'bot', args.join(' ')) as Command
      bot.add(name, func) // make a command with the arguments that are left
      message.channel.send(`🎉 Created ${name}!`) // tell the user
    } else message.channel.send('Uhh, you forgot the code.')
  } else message.channel.send('You are not the bot owner.')
}
export const desc = 'Adds a command to the bot, until it restarts.'
