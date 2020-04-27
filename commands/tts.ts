import { Message } from 'discord.js'
import { hasFlag } from '../util'
import ttsWithoutTypes = require('google-tts-api')

async function tts (
  text: string = '',
  lang: string = 'en',
  speed: number = 1
): Promise<string> {
  return ttsWithoutTypes(text, lang, speed)
}

export const run = async (_message: Message, args: string[]) => {
  try {
    if (hasFlag(args, 'slow')) {
      return {
        files: [
          {
            attachment: await tts(
              args.filter(arg => !arg.startsWith('--')).join(' '),
              'en',
              0.27
            ),
            name: 'sound.mp3'
          }
        ]
      }
    } else {
      return {
        files: [
          {
            attachment: await tts(
              args.filter(arg => !arg.startsWith('--')).join(' '),
              'en',
              1
            ),
            name: 'sound.mp3'
          }
        ]
      }
    }
  } catch (e) {
    if (e instanceof RangeError) {
      return 'The -tts command only supports up to 200 chars. Blame Google!'
    } else return 'Error!\nError data:\n' + e
  }
}

export const desc = 'gives you an mp3 of what you typed. try using --slow'
