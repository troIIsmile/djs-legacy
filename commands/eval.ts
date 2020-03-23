import { Bot, Message } from 'jackbot-discord'
import clean from "../utils/clean"
import { hasPerm } from '../utils/permissions'

export async function run (message: Message, args: string[], client: Bot): Promise<string> {
  if (hasPerm(message)) {
    try {
      const code = args.join(" ")
      const evaled = eval(code)
      const txt = await clean(client, evaled)
      return `\`\`\`js\n${txt}\n\`\`\``
    } catch (err) {
      return `\`ERROR\` \`\`\`xl\n${await clean(client, err)}\n\`\`\``
    }
  } else return 'You are not the bot owner.'
}
export const desc = 'give it code and it runs it'
