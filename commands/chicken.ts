import { Message } from 'jackbot-discord'
const command = (message: Message) => message.channel.send('on a raft')
export const desc = 'ayo'
export const run = command
