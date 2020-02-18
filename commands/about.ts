import { Message } from 'jackbot-discord'

export default (message: Message) => {
  const timestamp = process.uptime()

  // 2
  const hours = Math.floor(timestamp / 60 / 60)

  // 37
  const minutes = Math.floor(timestamp / 60) - (hours * 60)

  // 42
  const seconds = Math.floor(timestamp % 60)

  const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')

  message.channel.send(`
  Uptime: ${formatted}
  `.split('\n').map(line => line.trim()).join('\n'), { code: true })
}
