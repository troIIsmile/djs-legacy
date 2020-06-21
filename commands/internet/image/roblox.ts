import { Message } from 'discord.js'

export const run = (_message: Message, args: string[]) => {
  return {
    files: [
      {
        attachment:
          'https://roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=' +
          args.join('%20'),
        name: 'avatar.png'
      }
    ]
  }
}
export const help = 'it is free'
