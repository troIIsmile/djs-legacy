import { Message, MessageOptions } from 'discord.js'
import dl from 'youtube-dl'
export const run = async (message: Message, args: string[]): Promise<MessageOptions | undefined> => {
  try {
    await message.channel.send({
      files: [
        {
          attachment: dl(encodeURI(args.join(' ')), [], {}),
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
        title: 'Error! (Click here to try again)',
        url: `https://projectlounge.pw/ytdl/download?url=${encodeURIComponent(
          args.join(' ')
        )}`,
        description: e.toString()
      }
    }
  }
}

export const desc = 'download videos'
