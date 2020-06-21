import { Message } from 'discord.js'

export function run (message: Message, args: string[]) {
  if (args.join('').length === 0)
    return message.reply('give me text to convert to fullwidth!')
  return args
    .join('')
    .replace(/[A-Za-z0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 0xfee0))
}

export const help = 'ＶＡＰＯＲＷＡＶＥ'
