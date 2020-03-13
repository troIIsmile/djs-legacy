import { Message as roblox } from 'jackbot-discord'
export const run = (message: roblox, args: string[]) => message.channel.send({
  files: [ {
    attachment: 'https://roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=' + args.join('%20'),
    name: 'avatar.png'
  } ]
})
export const desc = 'it is free'
