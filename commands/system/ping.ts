import { Message } from 'discord.js'
import { Bot } from '../../utils/types'

export const run = async function (this: Bot, message: Message, _args: string[])  {
  const msg = (await message.channel.send('Ping?')) as Message
  msg.edit(
    `Pong! Latency is ${msg.createdTimestamp -
      message.createdTimestamp}ms. API Latency is ${Math.round(
      this.ws.ping
    )}ms`
  )
}
export const desc = 'see the l a g of the bot'
