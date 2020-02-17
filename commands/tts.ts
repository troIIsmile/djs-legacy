import { Message } from 'discord.js'
import tts = require('google-tts-api')
export default async (message: Message, args: string[]) => {
  try {
    message.channel.send({
      files: [{
        attachment: await tts(args.join(' ')),
        name: 'sound.mp3'
      }]
    })
  } catch (e) {
    message.channel.send('Error!\nError data:\n' + e)
  }
}
