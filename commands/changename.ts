import { Message } from 'discord.js'
export const run = (message: Message, args: string[]) => {
  if (message.guild) {
    if (!message.guild.me?.hasPermission('MANAGE_NICKNAMES')) {
      return 'I don\'t have permission to change your nickname!'
    }
    message.member?.setNickname(args.join(' '))
    return `Changed your username to ${args.join(' ')}!`
  } else return 'This command only works in servers!'
}

module.exports.nodm = true
export const desc = 'Change your nickname.'
