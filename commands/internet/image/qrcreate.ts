import { Message } from 'discord.js'

export function run (message: Message, args: string[]) {
  if (args.join('').length === 0)
    return message.reply('give me text to make a QR Code from!')
  return {
    files: [
      {
        attachment:
          'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=' +
          encodeURIComponent(args.join('+')).replace(/%2B/g, '+'),
        name: 'code.png'
      }
    ]
  }
}

export const help = 'make a QR Code'
