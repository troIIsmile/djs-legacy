import { Message } from 'discord.js'
import { permList } from '../utils/permissions'

export const run = (message: Message) => {
  const input = permList(message)
  const last = input.pop()
  const result = input.join(', ') + ' and ' + last
  return `You have ${result}`
}
export const desc = 'see what perms you have'
