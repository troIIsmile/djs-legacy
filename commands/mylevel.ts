import { Message } from 'jackbot-discord'
import { permList } from '../permissions'

export const run = (message: Message) => {
  const input = permList(message)
  const last = input.pop()
  const result = input.join(', ') + ' and ' + last
  message.channel.send(`You have ${result}`)
}
export const desc = 'see what perms you have'
