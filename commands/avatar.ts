import { Message } from 'discord.js'

export const run = (message: Message) => {
  if (!message.mentions.users.size) {
    return {
      files: [
        {
          attachment: message.author.displayAvatarURL,
          name: 'avatar.png'
        }
      ]
    }
  } else
    return {
      files: [
        {
          attachment: message.mentions.users.first()?.displayAvatarURL(),
          name: 'avatar.png'
        }
      ]
    }
}
export const desc = 'Get the avatar of a user.'
