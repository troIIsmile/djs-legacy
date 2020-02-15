import {Message} from 'discord.js'
const command = (message: Message) => message.channel.send('chicken on a raft')
command.desc = 'ayo'
export default command