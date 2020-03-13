import { writeFileSync as write, existsSync as exists } from 'fs'
export function hasFlag (args: string[], flag: string): boolean {
  return args
    .filter(arg => arg.startsWith('--')) // only flags
    .includes('--' + flag) // does any of the args have the flag
}

if (!exists('./data.json')) write('./data.json', '{}')
type JSONTypes = string | number | boolean | null | PersistStorage | JSONTypes[]

interface PersistStorage {
  [key: string]: JSONTypes
}
export const persist: PersistStorage = new Proxy({}, {
  get (_, name) {
    return require('./data.json')[name]
  },
  set (_, prop: string, value: any): boolean {
    let data = require('./data.json')
    data[prop] = value
    write('./data.json', JSON.stringify(data, null, 2))
    return true
  }
})
