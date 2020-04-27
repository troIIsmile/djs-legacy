import random from '../utils/random'
import { Message } from 'discord.js'
const faces = ['OwO', 'UwU', '-w-']
export const run = (message: Message, args: string[]) => {
  return {
    content: `*${args.join(' ')}* ${random(faces)}`,
    disableMentions: 'everyone'
  }
}
export const desc = 'Pwease use my Disoword bot UwU'
