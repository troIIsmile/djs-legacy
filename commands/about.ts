import { Message, Bot } from 'jackbot-discord'

export const run = (message: Message, _: string[], bot: Bot) => {
  const timestamp = process.uptime()

  // 2
  const hours = Math.floor(timestamp / 60 / 60)

  // 37
  const minutes = Math.floor(timestamp / 60) - (hours * 60)

  // 42
  const seconds = Math.floor(timestamp % 60)

  const formatted = `${hours} hour(s), ${minutes} minute(s), and ${seconds} second(s).`
  
  return {
    embed: {
      author: {
        name: 'NXTBOT Info',
        iconURL: bot.user.displayAvatarURL()
      },
      color: 0x454545,
      fields: [{
        name: '✏ Credits',
        value: `
        Developed by **Jack#9701**
        Some snippets of code from Guidebot by eslachance and esmBot by **Essem#9261**
        ["Playing" messages from esmBot](https://github.com/TheEssem/esmBot/blob/master/messages.json)`
      }, {
        name: '💬 Server Count',
        value: bot.guilds.cache.size,
        inline: true
      }, {
        name: '🧑🏻 User Count',
        value: bot.users.cache.size,
        inline: true
      }, {
        name: 'ℹ Version',
        value: require('../package.json').version,
        inline: true
      }, {
        name: '⏰ Uptime',
        value: formatted,
        inline: true
      }]
    }
  }
}

export const desc = 'Statistics about the bot.'
