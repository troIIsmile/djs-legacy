import { Message } from 'jackbot-discord'
export const run = (message: Message) => message.channel.send({
  files: [ {
    attachment: 'https://thiscatdoesnotexist.com',
    name: 'cat.jpeg'
  } ]
})
export const desc = 'this cat does not exist'
