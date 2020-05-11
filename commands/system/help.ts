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
export function run (_message: Message, args: string[], bot: Bot) {
  const page = parseInt(args.join('')) || 1
  const commands = Array.from(
    bot.commands.entries()
  )
    .filter(([, { desc }]) => { // Remove commands without description
      return !!desc
    })
    .map(([name, { desc }]) => [name, desc || '']) // Only descriptions
    .sort((a, b) => {
      return a[0].localeCompare(b[0] || '') || -1
    })
  const chunks = chunk(commands, 20)

  return chunks[page - 1] ? {
    embed: {
      title: `${bot.user?.username || ''} Commands`,
      fields: chunks[page - 1].map(([name, value]: [string, string]) => {
        return { name, value }
      }),
      footer: {
        iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/VisualEditor_-_Icon_-_Book.svg/600px-VisualEditor_-_Icon_-_Book.svg.png',
        text: `${page}/${chunks.length}`
      }
    }
  } : {
      embed: {
        title: `${bot.user?.username || ''} Commands`,
        description: 'That page does not exist.'
      }
    }
}

export const desc = 'Shows a list of all the commands and their descriptions.'
