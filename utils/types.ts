import { Client, Message, MessageOptions } from 'discord.js'
type Return = (MessageOptions | string | void)
type Command = (message: Message, args: string[], bot: Bot) => Return | Promise<Return>

interface Bot extends Client {
  commands: Map<string, Command>
}

export {
  Bot, Command, Return
}
