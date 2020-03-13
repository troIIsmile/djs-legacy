import { Bot, Message } from 'jackbot-discord'
import { hasPerm } from '../permissions'

async function command (message: Message, _: string[], bot: Bot) {
  if (hasPerm(message)) {
    await message.channel.send('bye!')
    bot.destroy()
    process.exit(0)
  } else message.channel.send('you are not the bot owner')
}
export const desc = 'Turns off the bot.'
export const run = command
