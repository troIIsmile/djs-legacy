import { Bot, Message } from 'jackbot-discord'
import { env } from '../util'
async function command (message: Message, _: string[], bot: Bot) {
  if (message.author.id === env.OWNER) {
    bot.destroy()
    message.reply('Bot is shutting down.')
    process.exit(0)
  } else message.channel.send('you are not the bot owner')
}
export const desc = 'Shuts down the bot.'
export default command
