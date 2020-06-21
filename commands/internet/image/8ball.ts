import { MessageOptions } from 'discord.js'
interface APIResult {
  answer: string
  image: string
  forced: boolean
}

export async function run (): Promise<MessageOptions> {
  const { answer, image: url }: APIResult = await (await fetch('https://yesno.wtf/api')).json()
  return {
    embed: {
      author: {
        name: 'Yes Or No?',
        url: 'https://yesno.wtf/',
        iconURL: 'https://yesno.wtf/assets/favicons/favicon-32x32-32e4b13414766709719da720e81cf1b2.png'
      },
      title: answer,
      image: {
        url
      }
    }
  }
}
export const help = 'Yes, no, or maybe'
