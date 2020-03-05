import { Message } from 'jackbot-discord'
export default (message: Message) => message.channel.send({
  files: [ {
    attachment: 'https://thispersondoesnotexist.com/image',
    name: 'person.png'
  } ]
})
