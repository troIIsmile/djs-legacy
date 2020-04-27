// TODO: Add some sort of cool embed
import { Message } from 'discord.js'
import { Bot } from '../utils/types'

interface Describe {
  [key: string]: string
}

export async function run (_message: Message, _args: string[], bot: Bot) {
  try {
    const commands = Array.from(bot.commands.keys())
    const descriptions: Describe = Object.fromEntries(
      await Promise.all(
        commands.map(async id => [id, (await import(`./${id}`)).desc])
      )
    )
    return commands // list of command names
      .map(name => `**-${name}** :: ${descriptions[name]}`) // add "-" to the start
      .join('\n') // string seperated by newline
  } catch (e) {
    return {
      embed: {
        author: {
          name: 'Error!'
        },
        title: e.toString(),
        color: 0xff0000
      }
    }
  }
}

export const desc = 'what the fuck are you using right now'
