import { writeFileSync as write, existsSync as exists } from 'fs'
export function hasFlag (args: string[], flag: string): boolean {
  return args
    .filter(arg => arg.startsWith('--')) // only flags
    .includes('--' + flag) // does any of the args have the flag
}

if (!exists('./prefixes.json')) write('./prefixes.json', '{}')


interface Prefixes {
  [key: string]: string
}
export const prefixes: Prefixes = new Proxy({}, {
  get (_, name) {
    return require('./prefixes.json')[name]
  },
  set (_, prop: string, value: any): boolean {
    let data = require('./prefixes.json')
    data[prop] = value
    write('./prefixes.json', JSON.stringify(data, null, 2))
    return true
  }
})
