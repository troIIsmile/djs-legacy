import { Bot } from "./types"

export function getCommandName (bot: Bot, cmdname: string) {
  return bot.commands.has(cmdname) ? cmdname : bot.aliases.get(cmdname)
}

export function getCommand (bot: Bot, name: string | undefined): ReturnType<Bot['commands']['get']> {
  if (!name) return
  return bot.commands.get(getCommandName(bot, name || '') || '')
}

export function commandFromMessage (bot: Bot, content: string, prefix: string): string | undefined {
  return [...bot.commands.keys(), ...bot.aliases.keys()].find(
    cmdname =>
      content.startsWith(`${prefix}${cmdname} `) || // matches any command with a space after
      content === `${prefix}${cmdname}` // matches any command without arguments
  )
}

export function getargs (bot: Bot, content: string, prefix: string) {
  const name = commandFromMessage(bot, content, prefix)
  if (!name) return []
  return content
    .substring(prefix.length + 1 + name.length) // only the part after the command
    .split(' ') // split with spaces
}
