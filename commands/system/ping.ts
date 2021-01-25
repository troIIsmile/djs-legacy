import { Message } from 'discord.js'
import { Bot } from '../../utils/types'

export const run = async function (this: Bot, message: Message)  {
  const msg = await message.channel.send('Ping?')
  msg.edit(
    `Pong! Latency is ${msg.createdTimestamp -
      message.createdTimestamp}ms. API Latency is ${Math.round(
      this.client.ws.ping
    )}ms`
  )
}
export const help = 'see the l a g of the bot'
