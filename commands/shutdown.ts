import { hasPerm } from '../utils/permissions'
import { Bot } from '../utils/types'
import { Message } from 'discord.js'

async function command (message: Message, _: string[], bot: Bot) {
  if (hasPerm(message)) {
    await message.channel.send('bye!')
    bot.destroy()
    process.exit(0)
  } else return 'you are not the bot owner'
}
export const desc = 'Turns off the bot.'
export const run = command
