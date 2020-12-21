import { Bot } from './types'
import { inspect } from 'util'

/**
 * "Clean" removes @everyone pings, as well as tokens, and makes code blocks
 * escaped so they're shown more easily. As a bonus it resolves promises
 * and stringifies objects!
 * @author Évelyne Lachance <eslachance@gmail.com> (http://luckyevelyne.wordpress.com/)
 * @license MIT
 * @param client A discord.js client.
 * @param text Any object.
 */
export default async function ({client}: Bot, text: any): Promise<string> {
  if (text && text instanceof Promise) text = await text
  if (typeof text !== 'string') text = inspect(text, { depth: 1 })
  text = text
    .replace(/`/g, '`' + String.fromCharCode(8203))
    .replace(/@/g, '@' + String.fromCharCode(8203))
    .replace(client.token, '<redacted>')
  return text
}
