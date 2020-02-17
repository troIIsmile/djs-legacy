
import { Message, Bot } from 'jackbot-discord'
export default (message: Message, _: void, bot: Bot) => message.channel.send('List of all servers the bot is in: \n```' + bot.guilds.map(g => g.name).join('\n') + '```')
