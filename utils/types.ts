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
import Trollsmile from 'trollsmile-core'
type Bot = Trollsmile<Message, CommandObj> & {
  client: Client
  getCommandName (cmdname: string): string | undefined;
}

export {
  Bot, CommandObj
}
