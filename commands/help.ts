import { Message, Bot } from 'jackbot-discord'

interface Describe {
  [ key: string ]: string
}

export async function run (message: Message, _: string[], bot: Bot) {
  const descriptions: Describe = Object.fromEntries(
    await Promise.all(
      Object.keys(bot.commands)
        .map(async id => [ id, (await import(`./${id}`)).desc ])
    )
  )
  message.channel.send(
    Object.keys(bot.commands) // list of command names
      .map(name => `-${name} :: ${descriptions[ name ]}`) // add "-" to the start
      .join('\n') // string seperated by newline
    ,
    { code: '' })
}

export const desc = 'what the fuck are you using right now'
