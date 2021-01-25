import { exec } from "child_process"
import { Message } from 'discord.js'
import { platform } from "os"
import { basename } from "path"
import { rreaddir } from "../../utils/rreaddir"
import { Bot, CommandObj } from '../../utils/types'

const shell = (str: string) => new Promise<string>((resolve, reject) => {
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
    const start = new Date
    const brand = `${this.client.user?.username || 'trollsmile'} update`
    const msg = await message.channel.send({
      embed: {
        author: {
          name: brand,
          icon_url: this.client.user?.avatarURL() || undefined
        },
        title: 'Downloading latest trollsmile...'
      }
    })
    try {
      await shell('git fetch origin master')
      await shell('git reset --hard origin/master')
      msg.edit({
        embed: {
          author: {
            name: brand,
            icon_url: this.client.user?.avatarURL() || undefined
          },
          title: 'Updating dependencies...'
        }
      })
      await shell('npm i')
      msg.edit({
        embed: {
          author: {
            name: brand,
            icon_url: this.client.user?.avatarURL() || undefined
          },
          title: 'Compiling...'
        }
      })
      await shell(
        platform() === 'win32'
          ? 'PowerShell -Command "rm commands/**/*.js"'
          : 'rm commands/**/*.js'
      ) // remove previous files because what if i deleted a command
      await shell('npx tsc')
      msg.edit({
        embed: {
          author: {
            name: brand,
            icon_url: this.client.user?.avatarURL() || undefined
          },
          title: 'Reloading all commands...'
        }
      })
      Object.keys(require.cache).forEach(name => {
        delete require.cache[name]
      })
      this.commands.clear()
      this.aliases.clear()
      this.client.emit('ready')
      msg.edit({
        embed: {
          author: {
            name: brand,
            icon_url: this.client.user?.avatarURL() || undefined
          },
          color: 'GREEN',
          title: `Update complete! Took ${(new Date().getTime() - start.getTime())}ms`,
          description: 'Restart the bot to reload events and messages.'
        }
      })
    } catch (e) {
      if (typeof e === 'string') {
        msg.edit({
          embed: {
            author: {
              name: brand,
            },
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
export const help = 'Updates the bot.'
