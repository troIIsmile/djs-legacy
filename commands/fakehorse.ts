import { Message } from 'jackbot-discord'
export const run = (message: Message) => message.channel.send({
  files: [ {
    attachment: 'https://thishorsedoesnotexist.com',
    name: 'horse.jpeg'
  } ]
})
export const desc = 'this horse does not exist'
