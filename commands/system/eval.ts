import { Message, MessageOptions } from 'discord.js'
import clean from '../../utils/clean'
import { hasPerm } from '../../utils/permissions'
import { Bot } from '../../utils/types'

export async function run (
  this: Bot,
  message: Message,
  args: string[]
): Promise<MessageOptions> {
  if (hasPerm(message)) {
    try {
      const code = args.join(' ')
      const evaled = eval(code)
      const txt = await clean(this, evaled)
      const msg = `\`\`\`js\n${txt}\n\`\`\``
      if (msg.length <= 2000) return { content: msg }
      
      return {
        content: 'The output was more than 2000 characters; here is a file with the output:',
        files: [{
          name: 'output.txt',
          attachment: new Buffer(txt)
        }]
      }
    } catch (err) {
      return { content: `\`ERROR\` \`\`\`xl\n${await clean(this, err)}\n\`\`\`` }
    }
  } else return { content: 'You are not the bot owner.' }
}
export const desc = 'give it code and it runs it'
