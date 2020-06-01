import { Message } from 'discord.js'
import ytdl from 'ytdl-core'
export async function run (message: Message) {
  message.channel.send({
    file: 'http://assets.stickpng.com/thumbs/5845e755fb0b0755fa99d7f3.png',
    content: `le doge has arrived`
  })
  if (message.member?.voice.channel) {
    const channel = message.member.voice.channel
    const stream = ytdl('https://www.youtube.com/watch?v=sd4bqmP_460', {
      filter: 'audioonly'
    })
    const connection = await channel.join()
    const dispatch = connection.play(stream, { volume: false, seek: 0 })
    dispatch.on('end', channel.leave.bind(channel))
  }
}
export const desc = 'wow'
