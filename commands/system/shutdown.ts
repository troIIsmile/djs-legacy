import { hasPerm } from '../../utils/permissions'
import { Bot } from '../../utils/types'
import { Message } from 'discord.js'

async function command (this: Bot, message: Message) {
  if (hasPerm(message)) {
    await message.channel.send({
      embed: {
        author: {
          name: this.user?.username
        },
        desc: 'Shutting down...',
        color: 'RED'
      }
    })
    this.destroy()
    process.exit(0)
  } else return 'you are not the bot owner'
}
export const desc = 'Turns off the bot.'
export const run = command
export const aliases = ['reboot']
