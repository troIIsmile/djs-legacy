import { hasPerm } from '../../utils/permissions'
import { Bot } from '../../utils/types'
import { Message } from 'discord.js'

export async function run (this: Bot, message: Message) {
  if (hasPerm(message)) {
    await message.channel.send({
      embed: {
        author: {
          name: this.user?.username
        },
        description: 'Shutting down...',
        color: 'RED'
      }
    })
    this.destroy()
    process.exit(0)
  } else return 'you are not the bot owner'
}
export const help = 'Turns off the bot.'
export const aliases = ['reboot']
