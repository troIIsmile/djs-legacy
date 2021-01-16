import { MessageOptions, version as discordVersion } from 'discord.js'
import { Bot } from '../../utils/types'
import fetch from 'node-fetch'
import { homepage as url, version } from '../../package.json'
export async function run (this: Bot): Promise<MessageOptions> {
  const timestamp = process.uptime()

  // hours
  const hours = Math.floor(timestamp / 60 / 60)

  const owner = this.client.users.cache.get(process.env.OWNER!) || await this.client.users.fetch(process.env.OWNER!)

  if (!(this.client.user && owner)) return {
    content: 'oops the owner or the bot user does not exist some how'
  }

  const esmBotMessages: string[] = await fetch('https://raw.githubusercontent.com/TheEssem/esmBot/master/messages.json').then(res => res.json())
  const messages = (await import('../../messages')).all
  const linesFromEsmBot = messages.filter(line => esmBotMessages.includes(line)).length
  const percentOfLines = (linesFromEsmBot * 100) / messages.length
  return {
    embed: {
      author: {
        url,
        name: `About ${this.client.user.username}`,
        iconURL: this.client.user?.displayAvatarURL()
      },
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
        value: this.client.guilds.cache.size,
        inline: true
      }, {
        name: '🧑🏻 User Count',
        value: this.client.users.cache.size,
        inline: true
      }, {
        name: 'ℹ Bot Version',
        value: version, inline: true
      }, {
        name: '📚 Discord.js Version',
        value: discordVersion, inline: true
      }, {
        name: '⏰ Uptime',
        value: [hours, Math.floor(timestamp / 60) - (hours * 60), Math.floor(timestamp % 60)].join(':'),
        inline: true
      }, {
        name: '🖥 OS',
        value: process.platform,
        inline: true
      }, {
        name: '>_ Command Count',
        value: this.commands.size,
        inline: true
      }]
    }
  }
}

export const help = 'Statistics about the bot.'
export const aliases = ['list', 'stats']
