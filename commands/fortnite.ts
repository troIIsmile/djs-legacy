import { Message } from 'jackbot-discord'
import random from '../utils/random'
export const run = (message: Message) => {
  if (message.guild) {
  return `
You played Fortnite with ${random(Array.from(message.guild.members.cache))[ 1 ]}
Your ${(Math.random() >= 0.5 ? 'Battle Pass' : 'Free Pass')} tier is ${Math.floor(Math.random() * 100)}`
  } else return 'You must be in a server to use this command!'
}
export const desc = '@someone but funnier'
