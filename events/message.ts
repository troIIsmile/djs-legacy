import { Message } from 'discord.js'
import { Bot } from '../utils/types'
import prefixes from '../utils/prefixes'

// Command Handler (This used to be jackbot-discord!)
export default async function (this: Bot, message: Message) {
  // When a message is sent
  if (message.author?.bot) return
  // no bots allowed
  const prefix: string = prefixes[message.guild?.id || ''] || '-'
  const content = message.content || ''
  const name = [...this.commands.keys(), ...this.aliases.keys()].find(
    cmdname =>
      content.startsWith(`${prefix}${cmdname} `) || // matches any command with a space after
      content === `${prefix}${cmdname}` // matches any command without arguments
  )
  if (!name) return
  // Run the command!
  const command = this.commands.get(name)?.run // The command if it found it
    || this.commands.get(this.aliases.get(name) || '')?.run // Aliases
    || (() => { }) // Do nothing otherwise

  try {
    const output = await command.call(
      this,
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
          name: `${this.user?.username} ran into an error while running your command!`,
          // iconURL: this.user?.avatarURL()
        },
        title: err.toString(),
        color: 'RED',
        footer: {
          text: `Report this bug @ ${require('../package.json').bugs}`
        }
      }
    })
  }
}
