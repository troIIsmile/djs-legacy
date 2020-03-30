import {Message} from 'jackbot-discord'

export const run = async (message: Message, args: string[]) => {
  try {
    await message.channel.send({
      files: [{
        attachment: `https://projectlounge.pw/ytdl/download?url=${encodeURIComponent(args.join(' '))}`,
        name: 'video.mp4'
      }]
    }) 
  } catch (e) {
    if (e.toString() == 'DiscordAPIError: Request entity too large') return {
      embed: {
        author: {
          name: 'youtube-dl'
        },
        title: 'The video was too big to send; click here instead.',
        url: `https://projectlounge.pw/ytdl/download?url=${encodeURIComponent(args.join(' '))}`,
        color: 0x00FF00
      }
    }
    
    return {
      embed: {
        author: {
          name: 'youtube-dl'
        },
        color: 0xFF0000,
        title: 'Error!',
        description: e.toString()
      }
    }
  }
}

export const desc = 'download videos'