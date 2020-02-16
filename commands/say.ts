import {Message} from 'discord.js'
export default (message: Message, args: Array<String>) => {
  if (message.guild) {
    message.channel.send(args.join(' '))
    message.delete()
  } else message.channel.send('Only works in servers!')
}

module.exports.nodm = true
