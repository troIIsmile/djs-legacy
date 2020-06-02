/**
 * @file Utiliy
 * This file will be gone soon
 */
import { writeFileSync as write, existsSync as exists } from 'fs'

if (!exists('./prefixes.json')) write('./prefixes.json', '{}')


interface Prefixes {
  [key: string]: string
}
const prefixes: Prefixes = new Proxy({}, {
  get (_, name) {
    return require('../prefixes.json')[name]
  },
  set (_, prop: string, value: any): boolean {
    let data = require('../prefixes.json')
    data[prop] = value
    write('./prefixes.json', JSON.stringify(data, null, 2))
    return true
  }
})
export default prefixes
