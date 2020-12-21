import { Message } from 'discord.js'
export const run = (message: Message) => (
  message.guild ?
    `
    You played Fortnite with ${message.guild.members.cache.random()}
    Your ${Math.random() >= 0.5 ? 'Battle Pass' : 'Free Pass'} tier is ${Math.floor(Math.random() * 100)}`
    : 'You must be in a server to use this command!'
)
export const help = '@someone but funnier'
