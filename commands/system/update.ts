import { exec } from "child_process"
import { Message } from 'discord.js'
import { Bot } from '../../utils/types'
const shell = (str: string) => new Promise((resolve, reject) => {
  exec(str, (err, stdout, stderr) => {
    if (err) reject(stderr)
    resolve(stdout)
  })
})
export async function run (
  this: Bot,
  message: Message
): Promise<void> {
  if (message.author.id === process.env.OWNER) {
    const msg = await message.channel.send({
      embed: {
        title: 'trollsmile update',
        description: 'Fetching from Git...'
      }
    })
    try {
      await shell('git fetch origin master')
      msg.edit({
        embed: {
          title: 'trollsmile update',
          description: 'Resetting local changes...'
        }
      })
      await shell('git reset --hard origin/master')
      msg.edit({
        embed: {
          title: 'trollsmile update',
          description: 'Updating dependencies...'
        }
      })
      await shell('npm i')
      msg.edit({
        embed: {
          title: 'trollsmile update',
          description: 'Compiling...'
        }
      })
      await shell('npx tsc')
      msg.edit({
        embed: {
          color: 'GREEN',
          title: 'Update complete. restart manually you stupid bitch'
        }
      })
    } catch (e) {
      if (typeof e === 'string') {
        msg.edit({
          embed: {
            title: 'Error!',
            description: '```\n' + e + '\n```',
            color: 'RED'
          }
        })
      }
    }
  } else {
    message.reply('You are not the bot owner.')
  }
}
export const help = 'Updates trollsmile.'
