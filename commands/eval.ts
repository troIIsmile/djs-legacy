import { Bot, Message } from 'jackbot-discord'
import { clean } from '../util'
import hasOwner from '../permissions'

async function run (message: Message, args: string[], client: Bot): Promise<void> {
  if (hasOwner(message)) {
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

export default run
