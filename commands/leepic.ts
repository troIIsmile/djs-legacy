import { Message, Bot } from 'jackbot-discord'
import ytdl from 'ytdl-core'
export async function run (message: Message) {
  if (message.guild) {
    if (message.member?.voice.channel) {
      message.channel.send('Bro this is so sad, hey slave play fotnite rap battle')
      const channel = message.member.voice.channel
      const stream = ytdl('https://www.youtube.com/watch?v=3N4yIDfN-M8', { filter: 'audioonly' })
      const connection = await channel.join()
      const dispatch = connection.play(stream, { volume: false, seek: 0 })
      dispatch.on('end', channel.leave.bind(channel))
    } else message.channel.send('go in vc')
  } else message.channel.send('go in a server')
}
export const desc = 'run in vc for a funny. funny rap'