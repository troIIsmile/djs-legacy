import { Message } from 'discord.js'
export const run = (message: Message, args: string[]) => {
  var dmu = message.mentions.users.first() // grabbing the user mention
  args.shift()
  if (dmu) {
    dmu.send(args.join(' '))
  } else {
    return 'person not found'
  }
}

export const desc = 'direct message someone with the bot'
