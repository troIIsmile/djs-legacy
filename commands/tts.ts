import { Message } from 'jackbot-discord'
import { hasFlag } from '../util'
import ttsWithoutTypes = require('google-tts-api')

async function tts (text: string = '', lang: string = 'en', speed: number = 1): Promise<string> {
  return await ttsWithoutTypes(text, lang, speed)
}

export default async (message: Message, args: string[]) => {
  try {
    if (hasFlag(args, 'slow')) {
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
    if (e instanceof RangeError) {
      message.channel.send("The -tts command only supports up to 200 chars. Blame Google!")
    } else message.channel.send('Error!\nError data:\n' + e)
  }
}
