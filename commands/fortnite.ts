import { Message } from 'jackbot-discord'
export const run = (message: Message) => {
  message.channel.send(`
You an played Fortnite with ${Array.from(message.member.guild.members)[ Math.floor(Math.random() * message.member.guild.memberCount) ][ 1 ]}
Your ${(Math.random() >= 0.5 ? 'Battle Pass' : 'Free Pass')} tier is ${Math.floor(Math.random() * 100)}
`)
}
export const desc = '@someone but funnier'
