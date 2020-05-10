import { Message } from 'discord.js'
import { Bot } from '../../utils/types'

function chunk (array: any[], size: number = 1): Array<any> {
  let chunk: any[] = []
  return array.reduce((acc, curr, idx, arr) => {
    chunk.push(curr)
    if (chunk.length === size) {
      acc.push(chunk)
      chunk = []
    }
    if (chunk.length > 0 && idx === arr.length - 1) {
      acc.push(chunk)
    }
    return acc
  }, [])
}
export async function run (_message: Message, args: string[], bot: Bot) {
  try {
    const page = parseInt(args.join('')) || 1
    const commands = await Promise.all(
      Array.from(
        bot.commands.entries(), async ([name, { desc }]) => [name, desc]
      )
    ).then((unsorted) => unsorted.sort(([a], [b]) => a.localeCompare(b)))
    const chunks = chunk(commands, 20)

    if (!chunks[page-1]) {
      return {
        embed: {
          title: `${bot.user?.username || ''} Commands`,
          description: 'That page does not exist'
        }
      }
    }
    return {
      embed: {
        title: `${bot.user?.username || ''} Commands`,
        fields: chunks[page - 1].map(([name, value]: [string, string]) => {
          return { name, value }
        }),
        footer: {
          text: `${page}/${chunks.length}`
        }
      }
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
