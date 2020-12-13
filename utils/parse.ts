import { Bot, CommandObj } from "./types"

export function getCommandName (bot: Bot, cmdname: string) {
  return bot.commands.has(cmdname) ? cmdname : bot.aliases.get(cmdname)
}

export function getCommand (bot: Bot, name: string | undefined): CommandObj | undefined {
  if (!name) return
  return bot.commands.get(getCommandName(bot, name || '') || '')
}
