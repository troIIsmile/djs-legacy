import { Bot } from '../utils/types'
import random from '../utils/random'
export function run (this: Bot) {
  return random(
    this.guilds.cache
      .map(guild => guild.emojis.cache.array())
      .flat()
      .filter(Boolean).map(emoji => emoji.toString())
  ) || 'The bot somehow has no emoji. What the?'
}
export const desc = 'Random emote from the servers this bot is in'
