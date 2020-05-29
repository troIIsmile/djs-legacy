import { Message } from 'discord.js'
import clean from '../../utils/clean'
import { hasPerm } from '../../utils/permissions'
import { Bot } from '../../utils/types'

export async function run (
  this: Bot,
  message: Message,
  args: string[]
): Promise<string> {
  if (hasPerm(message)) {
    try {
      const code = args.join(' ')
      const evaled = eval(code)
      const txt = await clean(this, evaled)
      return `\`\`\`js\n${txt}\n\`\`\``
    } catch (err) {
      return `\`ERROR\` \`\`\`xl\n${await clean(this, err)}\n\`\`\``
    }
  } else return 'You are not the bot owner.'
}
export const desc = 'give it code and it runs it'
