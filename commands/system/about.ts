import { MessageOptions, version } from 'discord.js'
import { Bot } from '../../utils/types'
import fetch from 'node-fetch'

export async function run (this: Bot): Promise<MessageOptions> {
  const timestamp = process.uptime()

  // hours
  const hours = Math.floor(timestamp / 60 / 60)

  delete require.cache[require.resolve('../../package.json')] // Always get the latest package.json

  const owner = this.users.cache.get(process.env.OWNER as string)

  if (!(this.user && owner)) return {
    content: 'oops the owner or the bot user does not exist some how'
  }

  const esmBotMessages: string[] = await fetch('https://raw.githubusercontent.com/TheEssem/esmBot/master/messages.json').then(res => res.json())
  const messages = (await import('../../messages')).all
  const linesFromEsmBot = messages.filter(line => esmBotMessages.includes(line)).length
  const percentOfLines = (linesFromEsmBot * 100) / messages.length
  return {
    embed: {
      author: {
        name: `About ${this.user.username}`,
        iconURL: this.user?.displayAvatarURL(),
        url: require('../../package.json').homepage
      },
      title: 'Invite the bot',
      url: (await this.generateInvite(['ADMINISTRATOR'])),
      color: 0x454545,
      footer: {
        text: `Owned by ${owner.tag}`,
        iconURL: owner.displayAvatarURL()
      },
      fields: [{
        name: '✏ Credits',
        value: `
        URL for the -achievement command from esmBot by Essem#9261
        [${percentOfLines.toFixed(5)}% of the "Playing" messages from esmBot](https://github.com/TheEssem/esmBot/blob/master/messages.json)`,
        inline: false
      }, {
        name: '💬 Server Count',
        value: this.guilds.cache.size,
        inline: true
        },{
        name: '🧑🏻 User Count',
        value: this.users.cache.size,
        inline: true
      }, {
        name: 'ℹ Bot Version',
        value: require('../../package.json').version,
        inline: true
      }, {
        name: '📚 Discord.js Version',
        value: version, inline: true
      }, {
        name: '⏰ Uptime',
        value: [hours, Math.floor(timestamp / 60) - (hours * 60), Math.floor(timestamp % 60)].join(':'),
        inline: true
      }, {
        name: '🖥 OS',
        value: process.platform,
        inline: true
      }, {
        name: '🙋🏻‍♂️ Support',
        value: process.env.SUPPORT
      }, {
        name: '>_ Command Count',
        value: this.commands.size,
        inline: true
      }].filter(field => field.value) // Remove any fields without values (like support if it isn't in env)
    }
  }
}

export const desc = 'Statistics about the bot.'
export const aliases = ['list', 'stats']
