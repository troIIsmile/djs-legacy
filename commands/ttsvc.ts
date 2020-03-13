import { Message } from 'jackbot-discord'
import { hasFlag } from '../util'
import ttsWithoutTypes = require('google-tts-api')

async function tts (text: string = '', lang: string = 'en', speed: number = 1): Promise<string> {
  return await ttsWithoutTypes(text, lang, speed)
}

export const run = async (message: Message, args: string[]) => {
  if (!message.member?.voice.channel) {
    return message.channel.send('You need to be in a voice channel!')
  }
  try {
    const channel = message.member?.voice.channel
    let url: string
    if (hasFlag(args, 'slow')) {
      url = await tts(args.filter(arg => !arg.startsWith('--')).join(' '), 'en', 0.27)

    } else {
      url = await tts(args.filter(arg => !arg.startsWith('--')).join(' '), 'en', 1)
    }
    const connection = await channel.join()
    const dispatch = connection.play(url)
    dispatch.on('end', () => {
      dispatch.end()
      channel.leave()
    })

  } catch (e) {
    if (e instanceof RangeError) {
      message.channel.send('This command only supports up to 200 chars. Blame Google!')
    } else message.channel.send('Error!\nError data:\n' + e)
  }
}

export const desc = 'goes in your vc and say what you typed. try using --slow'
