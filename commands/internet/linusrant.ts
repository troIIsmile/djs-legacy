import { MessageOptions } from 'discord.js'
import random from '../../utils/random'
import fetch from 'node-fetch'
interface Rant {
  text: string
  hate: number
}

function escapeMarkdown (text: string) {
  const unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1') // unescape any "backslashed" character
  const escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1') // escape *, _, `, ~, \
  return escaped
}

const rants: Promise<Rant[]> = fetch('https://raw.githubusercontent.com/corollari/linusrants/master/data.json').then(res => res.json())
export async function run (): Promise<MessageOptions> {
  const { text, hate } = random(await rants)
  return {
    embed: {
      author: {
        name: 'Linus Torvalds',
        iconURL: 'https://upload.wikimedia.org/wikipedia/commons/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg',
      },
      description: escapeMarkdown(text),
      fields: [{
        name: 'Hate',
        value: (hate * 100).toFixed(2) + '%',
        inline: true
      }],
      footer: {
        text: 'Linux Kernel Mailing List'
      }
    }
  }
}
export const help = 'A random rant from the creator of Linux.'
export const aliases = ['linux']
