import { Message, MessageOptions } from 'discord.js'
import fetch from "node-fetch"
import { Bot } from '../../../utils/types'
type imgflip<memedata> = {
  success: true,
  data: memedata
} | {
  success: false
  error_message: string
}
export async function run (this: Bot, message: Message, args: string[]): Promise<string | MessageOptions> {
  // getting the template

  const memes: imgflip<{
    memes: {
      id: string
      name: string
      url: string
    }[]
  }> = await fetch('https://api.imgflip.com/get_memes').then(res => res.json())
  if (memes.success) {
    // posting the meme
    const [text0 = '', text1 = ''] = args.join(' ').split('|')
    const content: imgflip<{
      url: string
      page_url: string
    }> = await fetch('https://api.imgflip.com/caption_image?' + new URLSearchParams({
      username: process.env.IMGFLIP_USERNAME || '', password: process.env.IMGFLIP_PASSWORD || '', text0, text1, template_id: memes.data.memes.random().id
    }).toString(), {
      method: 'POST',
    }).then(res => res.json())

    if (content.success) {
      return content.data.page_url
    } else {
      return {
        embed: {
          title: 'Imgflip error!',
          description: content.error_message
        }
      }
    }
  } else {
    return {
      embed: {
        title: 'Imgflip error!',
        description: memes.error_message
      }
    }
  }

}
export const help = 'make a meme using imgflip - split the text using "|"'
export const aliases = ['imgflip']
