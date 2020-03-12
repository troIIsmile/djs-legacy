import { Message } from 'jackbot-discord'
export const run = (message: Message) => message.channel.send({
  files: [ {
    attachment: 'https://thispersondoesnotexist.com/image',
    name: 'person.png'
  } ]
})
export const desc = 'this person does not exist'
