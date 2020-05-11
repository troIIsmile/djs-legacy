import { Message } from 'discord.js'
import { Bot } from './types'

export default function alias (of: string) {
  return {
    run (message: Message, args: string[], bot: Bot) {
      const command = bot.commands.get(of)?.run || (() => { })
      return command(message, args, bot)
    }
  }
}
