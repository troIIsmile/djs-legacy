
import { Message } from 'discord.js'
const faces = ['OwO', 'UwU', '-w-']
export default (message: Message, args: string[]) => message.channel.send(`*${args.join(' ')}* ${faces[Math.floor(Math.random() * faces.length)]}`)
