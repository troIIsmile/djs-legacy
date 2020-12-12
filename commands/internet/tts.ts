import { Message } from 'discord.js'
import { getAudioUrl } from 'google-tts-api'

export const run = async (_message: Message, args: string[]) => {
  try {
    return {
      files: [
        {
          attachment: getAudioUrl(
            args.filter(arg => !arg.startsWith('--')).join(' '),
            {
              host: 'https://translate.google.com',
              slow: args.includes('--slow'),
              lang: 'en-US'
            }
          ),
          name: 'sound.mp3'
        }
      ]
    }
  } catch (e) {
    if (e instanceof RangeError) {
      return 'The -tts command only supports up to 200 chars. Blame Google!'
    } else throw e
  }
}

export const help = 'gives you an mp3 of what you typed. try using --slow'
