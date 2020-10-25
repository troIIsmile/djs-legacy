import { Message } from "discord.js"

export function run (message: Message, args: string[]) {
  if (
    args.length === 0
  ) {
    return `${message.author}, you need to provide what you want to spam!`
  }
  if (
    message.content.includes("@everyone") || message.content.includes("@here")
  ) {
    return "I don't know about you, but that seems like a bad idea."
  }
  return args.join(" ").repeat(2000).substring(0, 2000)
}

export const help = "repeat a message over and over"
