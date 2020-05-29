import { Message } from 'discord.js'
import { Bot } from '../utils/types'
import { prefixes } from '../util'

// NXTBOT Command Handler (This used to be jackbot-discord!)
export default async (message: Message, bot: Bot) => {
  // When a message is sent
  if (!message.author?.bot) {
    // no bots allowed
    const prefix: string = prefixes[message.guild?.id || ''] || '-'
    const content = message.content || ''
    const name = [...bot.commands.keys(), ...bot.aliases.keys()].find(
      cmdname =>
        content.startsWith(`${prefix}${cmdname} `) || // matches any command with a space after
        content === `${prefix}${cmdname}` // matches any command without arguments
    )
    // Run the command!
    if (name) {
      const command = bot.commands.get(name)?.run // The command if it found it
        || bot.commands.get(bot.aliases.get(name) || '')?.run // Aliases
        || (() => { }) // Do nothing otherwise

      try {
        const output = await command.call(
          bot,
          message as Message, // the message
          // The arguments
          content
            .substring(prefix.length + 1 + name.length) // only the part after the command
            .split(' '), // split with spaces
        )

        if (output) message.channel?.send(output)
      } catch (err) {
        message.channel?.send({
          embed: {
            author: {
              name: `${bot.user?.username} ran into an error while running your command!`,
              iconURL: bot.user?.avatarURL()
            },
            title: err.toString(),
            footer: {
              text: 'Report this bug @ ' + require('../package.json').bugs
            }
          }
        })
      }
    }
  }
}
