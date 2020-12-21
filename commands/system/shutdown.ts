import { Bot } from '../../utils/types'
import { Message } from 'discord.js'

export async function run (this: Bot, message: Message): Promise<string | never> {
  if (message.author.id === process.env.OWNER) {
    await message.channel.send({
      embed: {
        author: {
          name: this.client.user?.username
        },
        description: 'Shutting down...',
        color: 'RED'
      }
    })
    this.client.destroy()
    process.exit(0)
  } else return 'you are not the bot owner'
}
export const help = 'Turns off the bot.'
export const aliases = ['reboot']
