import { Message } from 'discord.js'
import clean from '../utils/clean'
import { hasPerm } from '../utils/permissions'
import { Bot } from '../utils/types'

export function run (
  message: Message,
  args: string[],
  client: Bot
): string {
  if (hasPerm(message)) {
    try {
      const code = args.join(' ')
      const evaled = eval(code)
      const txt = clean(client, evaled)
      return `\`\`\`js\n${txt}\n\`\`\``
    } catch (err) {
      return `\`ERROR\` \`\`\`xl\n${clean(client, err)}\n\`\`\``
    }
  } else return 'You are not the bot owner.'
}
export const desc = 'give it code and it runs it'
