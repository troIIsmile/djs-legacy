import { Client, Message, MessageOptions, Collection } from 'discord.js'
type Return = (MessageOptions | string | void)
type Command = (this: Bot, message: Message, args: string[]) => Return | Promise<Return>
interface CommandObj {
  run: Command,
  desc: string,
  path: string,
  aliases?: string[]
}

interface Bot extends Client {
  commands: Collection<string, CommandObj>
  aliases: Collection<string, string>
}

export {
  Bot, Command, Return, CommandObj
}
