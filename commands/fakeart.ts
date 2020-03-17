import { Message } from 'jackbot-discord'
export const run = (message: Message) => message.channel.send({
  files: [ {
    attachment: 'https://thisartworkdoesnotexist.com/artwork',
    name: 'art.jpeg'
  } ]
})
export const desc = 'this art does not exist'