import { Message } from 'discord.js'
import { commandFromMessage, getargs, getCommand } from "../utils/parse"
import { Bot } from '../utils/types'
import { bugs } from '../package.json'

// Command Handler (This used to be jackbot-discord!)
export default async function (this: Bot, message: Message) {
  // When a message is sent
  if (message.author.bot) return

  const prefix = '-' // bot prefix

  const name = commandFromMessage(this, message.content, prefix)

  if (!name) return

  const command = getCommand(this, name)?.run || (() => { })

  try {
    const output = await command.call(
      this,
      message,
      getargs(this, message.content, prefix)
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
          text: `Report this bug @ ${bugs}`
        }
      }
    })
  }
}
