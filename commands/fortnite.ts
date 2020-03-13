import { Message } from 'jackbot-discord'
export const run = (message: Message) => {
  if (message.guild) {
    message.channel.send(`
You played Fortnite with ${Array.from(message.guild.members.cache)[ Math.floor(Math.random() * message.guild.memberCount) ][ 1 ]}
Your ${(Math.random() >= 0.5 ? 'Battle Pass' : 'Free Pass')} tier is ${Math.floor(Math.random() * 100)}
`)
  } else message.channel.send('You must be in a server to use this command!')
}
export const desc = '@someone but funnier'
