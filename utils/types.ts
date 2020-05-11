import { Client, Message, MessageOptions, Collection } from 'discord.js'
type Return = (MessageOptions | string | void)
type Command = (message: Message, args: string[], bot: Bot) => Return | Promise<Return>
interface CommandObj {
  run: Command,
  desc: string,
  path?: string
}

interface Bot extends Client {
  commands: Collection<string, CommandObj>
}

export {
  Bot, Command, Return, CommandObj
}
