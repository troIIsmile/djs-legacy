import { Message } from 'jackbot-discord'
export default (message: Message, args: string[]) => {
  if (message.guild) {
    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) {
      return message.channel.send(
        "I don't have permission to change your nickname!"
      )
    }
    message.member.setNickname(args.join(' '))
    message.channel.send(`Changed your username to ${args.join(' ')}!`)
  } else message.channel.send('This command only works in servers!')
}

module.exports.nodm = true
