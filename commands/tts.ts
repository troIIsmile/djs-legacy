import { Message } from 'discord.js'
import tts = require('google-tts-api')
export default async (message: Message, args: string[]) => {
  try {
    if (args.filter(arg => arg.startsWith('--')).includes('--slow')) {
      message.channel.send({
        files: [ {
          attachment: await tts(args.filter(arg => !arg.startsWith('--')).join(' '), 'en', 0.27),
          name: 'sound.mp3'
        } ]
      })
    } else {
      message.channel.send({
        files: [ {
          attachment: await tts(args.filter(arg => !arg.startsWith('--')).join(' '), 'en', 1),
          name: 'sound.mp3'
        } ]
      })
    }
  } catch (e) {
    message.channel.send('Error!\nError data:\n' + e)
  }
}
