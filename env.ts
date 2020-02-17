import { readFileSync } from 'fs'

interface Env {
  [ key: string ]: string
}

const env: Env = Object.fromEntries(readFileSync('./.env', 'utf-8')
  .split('\n') // split the file into lines
  .map(line => line.split('=')) // split the lines into key:value pairs
)
export default env
