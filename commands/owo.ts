
import { Message } from 'jackbot-discord'
const faces = [ 'OwO', 'UwU', '-w-' ]
export const run = (message: Message, args: string[]) => message.channel.send(`*${args.join(' ')}* ${faces[ Math.floor(Math.random() * faces.length) ]}`)
export const desc = 'Pwease use my Disoword bot UwU'
