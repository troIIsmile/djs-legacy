import { readFileSync } from 'fs'

interface Env {
  [ key: string ]: string
}
const env: Env = {}

readFileSync('./.env', 'utf-8').split('\n').map(line => line.split('=')).forEach(line => {
  env[ line[ 0 ] ] = line[ 1 ]
})

export default env