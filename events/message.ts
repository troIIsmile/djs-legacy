import { Message } from 'discord.js'
import { getCommand } from "../utils/parse"
import { Bot } from '../utils/types'

// Command Handler (This used to be jackbot-discord!)
export default async function (this: Bot, message: Message) {
  // When a message is sent
  if (message.author.bot) return

  const prefix = '-' // bot prefix
  
  const name = [...this.commands.keys(), ...this.aliases.keys()].find(
    cmdname =>
      message.content.startsWith(`${prefix}${cmdname} `) || // matches any command with a space after
      message.content === `${prefix}${cmdname}` // matches any command without arguments
  ) || ''

  const command = getCommand(this, name)?.run || (() => { })

  try {
    const output = await command.call(
      this,
      message,
      // The arguments
      message.content
        .substring(prefix.length + 1 + name.length) // only the part after the command
        .split(' '), // split with spaces
    )

    if (output) message.channel?.send(output)
  } catch (err) {
    message.channel.stopTyping()
    message.channel.send({
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
