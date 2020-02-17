import { Message, Bot } from 'jackbot-discord'

export default (message: Message, _: string[], bot: Bot) => {
  message.channel.send(
    Object.keys(bot.commands) // list of command names
      .map(e => '-' + e) // add "-" to the start
      .join('\n') // string seperated by newline
    ,
    { code: '' })
}
