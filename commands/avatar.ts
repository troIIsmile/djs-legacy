import { Message } from 'jackbot-discord'

export default (message: Message) => {
  if (!message.mentions.users.size) {
    return message.channel.send({
      files: [ {
        attachment: message.author.displayAvatarURL,
        name: 'avatar.png'
      } ]
    })
  } else return message.channel.send({
    files: [ {
      attachment: message.mentions.users.first().displayAvatarURL,
      name: 'avatar.png'
    } ]
  })
}
