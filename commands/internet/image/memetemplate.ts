import { Message, MessageOptions } from 'discord.js'
import random from '../../../utils/random'

   interface Meme {
    id: string
    name: string
    url: string
    width: number
    height: number
    box_count: number
  }

   interface RootObject {
    success: boolean
    data: {
      memes: Meme[]
    }
  }

export async function run (): Promise<MessageOptions> {
  const { data: { memes } }: RootObject = await fetch('https://api.imgflip.com/get_memes').then(res => res.json())
  const {name: title, url: img_url} = random(memes)
  return {
    embed: {
      author: {
        name: 'Imgflip',
        iconURL: 'https://imgflip.com/apple-touch-icon.png',
        url: 'https://imgflip.com'
      },
      title,
      url: 'https://imgflip.com/meme/' + title.replace(/ /g, '-'),
      image: {
        url: img_url
      }
    }
  }
}
export const help = 'Get a random meme template from imgflip.'
export const aliases = []
