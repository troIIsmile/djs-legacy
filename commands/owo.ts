
import { Message } from 'jackbot-discord'
const faces = [ 'OwO', 'UwU', '-w-' ]
export const run = (message: Message, args: string[]) => {return {
  content: `*${args.join(' ')}* ${faces[ Math.floor(Math.random() * faces.length) ]}`,
  disableMentions: 'everyone'
}}
export const desc = 'Pwease use my Disoword bot UwU'
