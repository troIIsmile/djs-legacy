import { Message } from 'discord.js'
const faces = ['OwO', 'UwU', '-w-']
export const run = (message: Message, args: string[]) => {
  return {
    content: `*${args.join(' ')}* ${faces.random()}`,
    disableMentions: 'everyone'
  }
}
export const help = 'Pwease use my Disoword bot UwU'
