
import { Message, Client } from 'discord.js'
export default (message: Message, _: void, bot: Client) => message.channel.send('List of all servers the bot is in: \n```' + bot.guilds.map(g => g.name).join('\n') + '```')
