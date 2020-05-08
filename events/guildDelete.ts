import { Guild } from 'discord.js'

export default (guild: Guild) => {
  console.log('[GUILD] Bot has left `', guild.name, '`')
}
