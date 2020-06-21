import { Message, MessageOptions } from 'discord.js'
import fetch from 'node-fetch'
export const run = async (message: Message, args: string[]): Promise<MessageOptions> => {
  const video = await fetch(`https://projectlounge.pw/ytdl/download?url=${encodeURIComponent(
    args.join(' ')
  )}`).then(res => res.buffer())
  
  return {
    embed: {
      title: 'Click here if the video is not displayed.',
      url: `https://projectlounge.pw/ytdl/download?url=${encodeURIComponent(
        args.join(' ')
      )}`
    },
    files: video.length <= 8388608 ? [{
      attachment: video,
      name: 'video.mp4'
    }] : undefined
  }
}

export const help = 'download videos'
