import { Message } from 'jackbot-discord'
import ytdl from 'ytdl-core'
export async function run (message: Message) {
  if (message.guild) {
    if (message.member?.voice.channel) {
      message.channel.send('You\'re under arrest for posting NORMIE CRINGE!!!')
      const channel = message.member.voice.channel
      const stream = ytdl('https://www.youtube.com/watch?v=2mBdKnYb2gs', { filter: 'audioonly' })
      const connection = await channel.join()
      const dispatch = connection.play(stream, { volume: false, seek: 0 })
      dispatch.on('end', channel.leave.bind(channel))
    } else message.channel.send('go in vc')
  } else message.channel.send('go in a server')
}
export const desc = 'run in vc for a funny. normie cringe'
