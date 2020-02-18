import { readFileSync } from 'fs'

export function hasFlag (args: string[], flag: string): boolean {
  return args
    .filter(arg => arg.startsWith('--')) // only flags
    .includes('--' + flag) // does any of the args have the flag
}

interface Env {
  [ key: string ]: string
}

export const env: Env = Object.fromEntries(
  readFileSync('./.env', 'utf-8')
    .split('\n') // split the file into lines
    .filter(line => !line.startsWith('#')) // remove comments
    .filter(Boolean) // remove spacing
    .map(line => line.split('=')) // split the lines into key:value pairs
)
