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
      title: answer,
      image: {
        url
      }
    }
  }
}
export const desc = 'Yes, no, or maybe'
