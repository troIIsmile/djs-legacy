import { Bot, Message } from 'jackbot-discord'
import { clean } from '../util'
import { hasPerm } from '../permissions'

export async function run (message: Message, args: string[], client: Bot): Promise<void> {
  if (hasPerm(message)) {
    try {
      const code = args.join(" ")
      const evaled = eval(code)
      const txt = await clean(client, evaled)
      message.channel.send(`\`\`\`js\n${txt}\n\`\`\``)
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await clean(client, err)}\n\`\`\``)
    }
  } else message.channel.send('You are not the bot owner.')
}
export const desc = 'give it code and it runs it'
