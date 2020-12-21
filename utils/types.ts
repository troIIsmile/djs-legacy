import { Client, Message, Collection, TextChannel } from 'discord.js'
type Return = Parameters<TextChannel['send']>[0]

interface CommandObj {
  run: (this: Bot, message: Message, args: string[]) => Return | Promise<Return>,
  help: string,
  path: string,
  aliases?: string[]
}

// interface Bot extends Client {
//   commands: Collection<string, CommandObj>
//   aliases: Collection<string, string>
// }

type Bot = {
  client: Client
  commands: Collection<string, CommandObj>
  aliases: Map<string,string>
}

export {
  Bot, CommandObj
}
