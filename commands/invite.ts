import {Message, Bot} from 'jackbot-discord'
export const run = async (message: Message, args: string[], client: Bot) => {
  message.channel.send(await client.generateInvite(['ADMINISTRATOR']))
}
export const desc = 'add me to your server'