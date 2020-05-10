import { Message } from 'discord.js'
export const run = (message: Message, [_mention, ...args]: [string, string[]]) => {
  var dmu = message.mentions.users.first() // grabbing the user mention

  if (dmu) {
    dmu.send(args.join(' '))
  } else {
    return 'person not found'
  }
}

export const desc = 'direct message someone with the bot'
