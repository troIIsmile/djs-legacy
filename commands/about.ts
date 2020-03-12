import { Message, Bot } from 'jackbot-discord'

export const run = (message: Message, _: string[], bot: Bot) => {
  const timestamp = process.uptime()

  // 2
  const hours = Math.floor(timestamp / 60 / 60)

  // 37
  const minutes = Math.floor(timestamp / 60) - (hours * 60)

  // 42
  const seconds = Math.floor(timestamp % 60)

  const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')

  message.channel.send(`
  // How long the bot has been on for
  Uptime: ${formatted}
  Server count: ${bot.guilds.size}
  // Put more stats, please! -Jack
  `.split('\n')
    .map(line => line.trim()) // Remove whitespace
    .filter(Boolean) // Remove empty lines
    .filter(line => !line.startsWith('//')) // Remove comments
    .join('\n'), {
    code: true
  })
}

export const desc = 'Statistics about the bot.'
