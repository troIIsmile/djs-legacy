import { Message } from 'jackbot-discord'
export default (message: Message, args: string[]) => message.channel.send({
  files: [ {
    attachment: 'https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=' + args.join('%20'),
    name: 'avatar.png'
  } ]
})
