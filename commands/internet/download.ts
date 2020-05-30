import { Message } from 'discord.js'
import dl from 'youtube-dl'
export const run = async (message: Message, args: string[]) => {
  try {
    await message.channel.send({
      files: [
        {
          attachment: dl(encodeURI(args.join(' ')), ['--format=best'], {}),
          name: 'video.mp4'
        }
      ]
    })
  } catch (e) {
    if (e.toString() == 'DiscordAPIError: Request entity too large')
      return {
        embed: {
          author: {
            name: 'youtube-dl'
          },
          title: 'The video was too big to send; click here instead.',
          url: `https://projectlounge.pw/ytdl/download?url=${encodeURIComponent(
            args.join(' ')
          )}`,
          color: 'RED'
        }
      }

    return {
      embed: {
        author: {
          name: 'youtube-dl'
        },
        color: 'RED',
        title: 'Error!',
        description: e.toString()
      }
    }
  }
}

export const desc = 'download videos'
