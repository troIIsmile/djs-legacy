import {Message} from 'discord.js'
export default (message: Message, args: Array<String>) => message.channel.send({
  files: [{
    attachment: 'https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=' + args.join('%20'),
    name: 'avatar.png'
  }]
})


