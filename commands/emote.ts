import { Message } from 'discord.js'
import { Bot } from '../utils/types'
import random from '../utils/random'
export const run = (_message: Message, _args: string[], client: Bot) => random(
  client.guilds.cache
    .map(guild => guild.emojis.cache.array())
    .flat()
    .filter(Boolean).map(emoji => emoji.toString())
) || 'The bot somehow has no emoji. What the?'
export const desc = 'Random emote from the servers this bot is in'
