import { readFileSync, writeFileSync, existsSync } from 'fs'
import { Bot } from 'jackbot-discord'
import { inspect } from 'util'
export function hasFlag (args: string[], flag: string): boolean {
  return args
    .filter(arg => arg.startsWith('--')) // only flags
    .includes('--' + flag) // does any of the args have the flag
}

interface Env {
  [ key: string ]: string
}

export const env: Env = new Proxy({}, {
  set (_, prop: string, value: string): boolean {
    const env: Env = Object.fromEntries(
      readFileSync('./.env', 'utf-8')
        .split('\n') // split the file into lines
        .filter(line => !line.startsWith('#')) // remove comments
        .filter(Boolean) // remove spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    )
    env[ prop ] = value
    writeFileSync('./.env', Object.entries(env).map(ent => ent.join('=')).join('\n'))
    return true
  },

  get (_, prop: string) {
    return Object.fromEntries(
      readFileSync('./.env', 'utf-8')
        .split('\n') // split the file into lines
        .filter(line => !line.startsWith('#')) // remove comments
        .filter(Boolean) // remove spacing
        .map(line => line.split('=')) // split the lines into key:value pairs
    )[ prop ]
  }
})

export async function clean (client: Bot, text: any): Promise<string> {
  if (text && text instanceof Promise)
    text = await text
  if (typeof text !== 'string')
    text = inspect(text, { depth: 1 })

  text = text
    .replace(/`/g, '`' + String.fromCharCode(8203))
    .replace(/@/g, '@' + String.fromCharCode(8203))
    .replace(client.token, 'mfa.VkO_2GND--DFIjodSFISD+_F2_dontgetmyfuckingtokenyouhacker--fds9f)WJFSJIO')

  return text
}

if (!existsSync('./data.json')) writeFileSync('./data.json', '{}')
type JSONTypes = string | number | boolean | null | PersistStorage | JSONTypes[]

interface PersistStorage {
  [ key: string ]: JSONTypes
}
export const persist: PersistStorage = new Proxy({}, {
  get (_, name) {
    return require('./data.json')[ name ]
  },
  set (_, prop: string, value: any): boolean {
    let data = require('./data.json')
    data[ prop ] = value
    writeFileSync('./data.json', JSON.stringify(data, null, 2))
    return true
  }
})
