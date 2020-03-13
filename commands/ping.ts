import { Bot, Message } from 'jackbot-discord'

export const run = async (message: Message, _args: string[], client: Bot) => {
  const msg = await message.channel.send("Ping?") as Message
  msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
}
export const desc = 'see the l a g of the bot'
