import { Message } from 'jackbot-discord'
export const run = (message: Message, args: string[]) => {
  var dmu = message.mentions.users.first() // grabbing the user mention
  args.shift()
  if (dmu) { dmu.send(args.join(' ')) } else {
    message.channel.send('person not found')
  }
}

export const desc = 'direct message someone with the bot'
