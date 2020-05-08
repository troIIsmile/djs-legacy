import { Guild } from 'discord.js'

export default (guild: Guild) => {
  console.log('[GUILD] Bot has joined `', guild.name, '`')
}
