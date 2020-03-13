import { readFileSync as read } from 'fs'

process.env = {
  ...process.env,
  ...Object.fromEntries(
    read('./.env', 'utf-8')
      .split('\n') // split the file into lines
      .filter(line => !line.startsWith('#')) // remove comments
      .filter(Boolean) // remove spacing
      .map(line => line.split('=')) // split the lines into key:value pairs
  )
}

export { }
