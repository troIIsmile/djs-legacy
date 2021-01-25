import { Client, Message, TextChannel } from 'discord.js'
import Trollsmile from 'trollsmile-core'

type Return = Parameters<TextChannel['send']>[0]

interface CommandObj {
  run: (this: Bot, message: Message, args: string[]) => Return | Promise<Return>,
  help: string,
  path: string,
  aliases?: string[]
}


type Bot = Trollsmile<Message, CommandObj> & {
  client: Client
  getCommandName (cmdname: string): string | undefined
}


export {
  Bot, CommandObj
}
