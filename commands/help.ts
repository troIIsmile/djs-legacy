import { Message } from 'discord.js'
import Bot from 'jackbot-discord'
export default (message: Message, _: Array<String>, bot: Bot) => {
  message.channel.send(
    Object.keys(bot.commands) // list of command names
      .map(e => '-' + e) // add "-" to the start
      .map(e => `${e} | ${ bot.commands[ e.replace('-', '') ].desc }`)
        .join('\n') // string seperated by newline
      ,
      { code: '' })
}


