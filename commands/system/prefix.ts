import { Message } from 'discord.js'
import prefixes from '../../utils/prefixes'

export async function run (message: Message, args: string[]) {
  if (message.guild) {
    return (args.join('').length && message.member?.hasPermission('ADMINISTRATOR') || false)
      ? `Set your server's prefix to \`${prefixes[message.guild.id] = args.join(' ')}\`!`
      : 'You need to be a server admin and provide a prefix!'
  }
  return 'You need to be on a server you have admin on.'
}
export const help = 'Set the prefix for your server.'
export const aliases = []
