import {Message} from 'jackbot-discord'

export async function run (message: Message, args: string[]) {
  try {
    await message.channel.send({
      files: [{
        attachment: `https://projectlounge.pw/ytdl/download?url=${encodeURIComponent(args.join(' '))}`,
        name: 'video.mp4'
      }]
    }) 
  } catch (e) {
    if (e.toString() == 'DiscordAPIError: Request entity too large') return message.channel.send('video is too big to send')
    message.channel.send(e.toString())
  }
}

export const desc = 'downloaded using nxtbot'