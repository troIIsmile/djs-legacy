import { Message } from 'discord.js'

export const run = (message: Message) => message.mentions.users.size
  ? {
    files: [
      {
        attachment: message.mentions.users.first()?.displayAvatarURL(),
        name: 'avatar.png'
      }
    ]
  }
  : {
    files: [
      {
        attachment: message.author.displayAvatarURL(),
        name: 'avatar.png'
      }
    ]
  }
export const help = 'Get the avatar of a user.'
