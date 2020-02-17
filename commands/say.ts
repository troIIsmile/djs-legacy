import { Message } from 'jackbot-discord'

export default (message: Message, args: string[]) => {
  if (message.guild && message.guild.me.hasPermission('MANAGE_MESSAGES')) {
    message.channel.send(args.join(' '))
    message.delete(0)
  } else if (message.guild) { message.channel.send('I don\'t have permission to delete messages! Give me Manage Messages!') }
  else message.channel.send('This is a DM, I can\'t delete your message.')
}

export const nodm = true
