import { Message } from 'discord.js'
export const run = (message: Message) => {
  if (message.guild) {
    return `
You played Fortnite with ${message.guild.members.cache.random()}
Your ${Math.random() >= 0.5 ? 'Battle Pass' : 'Free Pass'} tier is ${Math.floor(
      Math.random() * 100
    )}`
  } else return 'You must be in a server to use this command!'
}
export const help = '@someone but funnier'
