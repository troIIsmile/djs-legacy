import { Message } from 'discord.js'
export default (message: Message) => {
  message.channel.send(`
You did an unfunny (played Fortnite) with ${Array.from(message.member.guild.members)[ Math.floor(Math.random() * message.member.guild.memberCount) ][ 1 ]}
Your ${(Math.random() >= 0.5 ? 'Battle Pass' : 'Free Pass')} tier is ${Math.floor(Math.random() * 100)}
`)
}

