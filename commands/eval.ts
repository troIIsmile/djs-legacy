import { Bot, Message } from 'jackbot-discord'
import { env, clean } from '../util'

async function run (message: Message, args: string[], client: Bot): Promise<void> {
  if (message.author.id === env.OWNER) {
    const code = args.join(" ")
    try {
      const evaled = eval(code)
      const txt = await clean(client, evaled)
      message.channel.send(`\`\`\`js\n${txt}\n\`\`\``)
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await clean(client, err)}\n\`\`\``)
    }
  } else {
    message.channel.send('You are not Jack.')
  }
}

export default run
