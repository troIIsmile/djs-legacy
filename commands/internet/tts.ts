import { Message } from 'discord.js'
import tts from 'google-tts-api'

export const run = async (_message: Message, args: string[]) => {
  try {
    return {
      files: [
        {
          attachment: await tts(
            args.filter(arg => !arg.startsWith('--')).join(' '),
            'en',
            args.includes('--slow')  ? 0.27 : 1
          ),
          name: 'sound.mp3'
        }
      ]
    }
  } catch (e) {
    if (e instanceof RangeError) {
      return 'The -tts command only supports up to 200 chars. Blame Google!'
    } else return 'Error!\nError data:\n' + e
  }
}

export const desc = 'gives you an mp3 of what you typed. try using --slow'
