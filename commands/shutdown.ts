import Bot from 'jackbot-discord'
import { Message } from 'discord.js'
async function command (message: Message, _: Array<String>, bot: Bot) {
  if (message.author.id === '173589391560802306') {
    bot.user.setActivity('windows xp shutdown sound', { type: 'PLAYING' })
    message.reply('Bot is shutting down.')
    Object.keys(bot.commands).forEach(cmd => {
      bot.remove(cmd)
    })

    process.exit(0)
  } else message.channel.send('you are not jack')
}
export const desc = 'Shuts down the bot.'
export default command
