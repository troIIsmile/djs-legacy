import { writeFileSync as write, existsSync as exists } from 'fs'
import { Bot } from 'jackbot-discord'
import { inspect } from 'util'
export function hasFlag (args: string[], flag: string): boolean {
  return args
    .filter(arg => arg.startsWith('--')) // only flags
    .includes('--' + flag) // does any of the args have the flag
}

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

if (!exists('./data.json')) write('./data.json', '{}')
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
    write('./data.json', JSON.stringify(data, null, 2))
    return true
  }
})
