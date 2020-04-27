import { Message, Bot } from 'jackbot-discord'
import fetch from 'node-fetch'

export const run = async (message: Message, _: string[], bot: Bot) => {
  const timestamp = process.uptime()

  // hours
  const hours = Math.floor(timestamp / 60 / 60)

  const formatted = `${hours} hour(s), ${Math.floor(timestamp / 60) - (hours * 60)} minute(s), and ${Math.floor(timestamp % 60)} second(s).`
  
  delete require.cache[require.resolve('../package.json')] // Always get the latest package.json
  
  const owner = bot.users.cache.get(process.env.OWNER as string)
  
  if (!(bot.user && owner)) return 'oops the owner or the bot user does not exist some how'
  
  const esmBotMessages = await fetch('https://raw.githubusercontent.com/TheEssem/esmBot/master/messages.json').then(txt=>txt.json())
  const messages = (await import('../messages')).all
  const linesFromEsmBot = messages.filter(line => esmBotMessages.includes(line)).length
  const percentOfLines = (linesFromEsmBot*100)/messages.length
  return {
    embed: {
      author: {
        name: `About ${bot.user.tag.split('#')[0]}`, // I'm sorry this is the only way I could figure out how
        iconURL: bot.user?.displayAvatarURL(),
        url: require('../package.json').homepage
      },
      color: 0x454545,
      footer: {
        text: `Owned by ${owner.tag}`,
        iconURL: owner.displayAvatarURL()
      },
      fields: [{
        name: '✏ Credits',
        value: `
        Some snippets of code from Guidebot by eslachance and esmBot by **Essem#9261**
        [${percentOfLines}% of the "Playing" messages from esmBot](https://github.com/TheEssem/esmBot/blob/master/messages.json)`,
        inline: true
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
      }, {
        name: '🙋🏻‍♂️ Support',
        value: process.env.SUPPORT
      }].filter(field=>field.value) // Remove any fields without values (like support if it isn't in env)
    }
  }
}

export const desc = 'Statistics about the bot.'
