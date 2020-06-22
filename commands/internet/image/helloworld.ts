import { MessageOptions } from 'discord.js'
import fetch from 'node-fetch'
import random from '../../../utils/random'
declare module API {

  export interface Payload {
    ".code.tio": string
  }

  export interface Request {
    command: string
    payload: Payload
  }

  export interface HelloWorld {
    request: Request[]
    response: string
  }

  export interface Tests {
    helloWorld: HelloWorld
  }

  export interface Language {
    categories: string[]
    encoding: string
    link: string
    name: string
    tests: Tests
    update: string
  }

  export interface List {
    [key: string]: Language
  }

}


export async function run (): Promise<MessageOptions> {
  const langs: API.List = await fetch('https://tio.run/languages.json').then(res => res.json())
  const { name: title, tests, link: url } = random(Object.entries(langs))[1]
  return {
    embed: {
      title,
      url,
      description: `\`\`\`
${random(tests.helloWorld.request).payload['.code.tio']}
\`\`\``,
      fields: [{
        name: 'Prints',
        value: tests.helloWorld.response
      }]
    }
  }
}
export const help = 'Hello world in a random programming language'
export const aliases = []
