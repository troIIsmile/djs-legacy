// TODO: Add some sort of cool embed
import { Message } from 'discord.js'
import { Bot } from '../../utils/types'

export async function run (_message: Message, _args: string[], bot: Bot) {
  try {
    const commands = await Promise.all(
      Array.from(
        bot.commands.entries(), async ([name, { desc }]) => [name, desc]
      )
    ).then((unsorted) => unsorted.sort(([a], [b]) => { // God is dead
      if (a < b) { return -1 }
      if (a > b) { return 1 }
      return 0
    }))
    console.log(commands)
    return {
      content: commands // list of command names
        .map(([name, desc]) => `**-${name}** :: ${desc}`) // add "-" to the start
        .join('\n'), // string seperated by newline
      split: true
    }
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

export const desc = 'Shows a list of all the commands and their descriptions.'
