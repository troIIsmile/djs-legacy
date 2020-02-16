import { Message } from 'discord.js'
const command = (message: Message) => message.channel.send('on a raft')
export const desc = 'ayo'
export default command