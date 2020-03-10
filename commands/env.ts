import { Message } from 'jackbot-discord'
import { env } from '../util'

async function run (message: Message, args: string[]): Promise<void> {
  if (message.author.id === env.OWNER) {
    const name = args[ 0 ] // record the name before we remove it
    args.shift() // remove the name
    env[ name ] = args.join(' ')
    message.channel.send(`Modified \`${name}\`!`)
  } else message.channel.send('You are not the bot owner.')
}

export default run
