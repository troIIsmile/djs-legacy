import { Bot } from "./types"

export function getCommandName (bot: Bot, cmdname: string) {
  return bot.commands.has(cmdname) ? cmdname : bot.aliases.get(cmdname)
}
