import { Bot, Message } from 'jackbot-discord'
import { env } from '../util'

async function clean (client: Bot, text: any): Promise<String> {
  if (text && text.constructor.name == "Promise")
    text = await text
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 1 })

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replace(client.token, "mfa.VkO_2GND--DFIjodSFISD+_F2_dontgetmyfuckingtokenyouhacker--fds9f)WJFSJIO")

  return text
}

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
