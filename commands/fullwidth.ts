import {Message} from 'jackbot-discord'

export function run (message: Message, args: string[]) {
  if (args.length === 0) return message.channel.send(`${message.author}, give me text to convert to fullwidth!`)
  message.channel.send(args.join('').replace(/[A-Za-z0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 0xFEE0) }))
}

export const desc = 'ＶＡＰＯＲＷＡＶＥ'