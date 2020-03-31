import { Message } from 'jackbot-discord'
import ytdl from 'ytdl-core'
export async function run (message: Message) {
  if (message.guild) {
    if (message.member?.voice.channel) {
      message.channel.send('Bro this is so sad, hey slave play fotnite rap battle')
      const channel = message?.member?.voice?.channel
      const stream = ytdl('https://www.youtube.com/watch?v=3N4yIDfN-M8', { filter: 'audioonly' })
      const connection = await channel?.join()
      const dispatch = connection?.play(stream, { volume: false, seek: 0 })
      if (dispatch && channel && connection) dispatch.on('end', ()=>{
        channel?.leave()
      })
    } else return 'go in vc'
  } else return 'go in a server'
}
export const desc = 'run in vc for a funny. funny rap'
