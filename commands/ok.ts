import {Message} from 'discord.js'
const command = (message: Message) => message.channel.send('retard')
command.desc = 'Was made in 45 seconds. Only replies with "retard". That\'s it.'
export default command