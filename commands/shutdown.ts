import { Bot, Message } from 'jackbot-discord'
import isBotOwner from '../permissions'

async function command (message: Message, _: string[], bot: Bot) {
  if (isBotOwner(message)) {
    await message.channel.send('bye!')
    await bot.destroy()
    process.exit(0)
  } else message.channel.send('you are not the bot owner')
}
export const desc = 'Shuts down the bot.'
export default command
