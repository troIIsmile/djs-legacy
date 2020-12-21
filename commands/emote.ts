import { Bot } from '../utils/types'
export function run (this: Bot) {
  return this.client.guilds.cache
    .map(guild => guild.emojis.cache.array())
    .flat()
    .filter(Boolean).map(emoji => emoji.toString())
    .random() || 'The bot somehow has no emoji. What the?'
}
export const help = 'Random emote from the servers this bot is in'
