import fetch from 'node-fetch'
import { MessageOptions } from 'discord.js'

interface Joke {
  setup: string
  punchline: string
  id: number
}
export async function run (): Promise<MessageOptions> {
  const [{ setup, punchline }]: Joke[] = await fetch('https://official-joke-api.appspot.com/jokes/programming/random').then(res => res.json()) 
  return {
    embed: {
      title: setup,
      description: punchline,
      author: {
        name: 'Official Joke API',
        url: 'https://github.com/15Dkatz/official_joke_api'
      }
    }
  }
}
export const help = 'is not funny'
export const aliases = []
