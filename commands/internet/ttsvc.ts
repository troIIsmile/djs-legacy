import { Message } from 'discord.js'
import { getAudioUrl as tts } from 'google-tts-api'

export const run = async (message: Message, args: string[]) => {
  if (!message.member?.voice.channel) {
    return 'You need to be in a voice channel!'
  }
  try {
    const channel = message.member?.voice.channel
    let url: string
    if (args.includes('--slow')) {
      url = tts(
        args.filter(arg => !arg.startsWith('--')).join(' '),
        {
          host: 'https://translate.google.com',
          slow: true,
          lang: 'en-US'
        }
      )
    } else {
      url = tts(
        args.filter(arg => !arg.startsWith('--')).join(' '),
        {
          host: 'https://translate.google.com',
          slow: false,
          lang: 'en-US'
        }
      )
    }
    const connection = await channel.join()
    const dispatch = connection.play(url)
    dispatch.on('end', () => {
      dispatch.end()
      channel.leave()
    })
  } catch (e) {
    if (e instanceof RangeError) {
      return 'This command only supports up to 200 chars. Blame Google!'
    } else return 'Error!\nError data:\n' + e
  }
}

export const help = 'goes in your vc and says what you typed. try using --slow'
