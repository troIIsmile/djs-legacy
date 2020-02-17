import { readFileSync } from 'fs'

interface Env {
  [ key: string ]: string
}
const env: Env = {}

readFileSync('./.env', 'utf-8')
  .split('\n') // split the file into lines
  .map(line => line.split('=')) // split the lines into key:value pairs
  .forEach(line => { // for each line
    env[line[0]] = line[1] // env key = value
  })

export default env
