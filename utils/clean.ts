import { Bot } from './types'
import { inspect } from 'util'

/**
 * Inspect an object and remove pings and secrets.
 * @author Évelyne Lachance <eslachance@gmail.com> (http://luckyevelyne.wordpress.com/)
 * @license MIT
 * @param client A discord.js client.
 * @param text Any object.
 */
export default async function (client: Bot, text: any): Promise<string> {
  if (text && text instanceof Promise) text = await text
  if (typeof text !== 'string') text = inspect(text, { depth: 1 })
  text = text
    .replace(/`/g, '`' + String.fromCharCode(8203))
    .replace(/@/g, '@' + String.fromCharCode(8203))
    .replace(client.token, '<redacted>')
  return text
}
