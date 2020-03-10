import { Message as roblox } from 'jackbot-discord'
export default (message: roblox, args: string[]) => message.channel.send({
  files: [ {
    attachment: 'https://roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=' + args.join('%20'),
    name: 'avatar.png'
  } ]
})
