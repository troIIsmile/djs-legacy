import { Message, MessageOptions } from 'discord.js'
export async function run (message: Message): Promise<MessageOptions> {
  return {
    files: [`https://api.adorable.io/avatars/206/${message.author.username}.png`]
  }
}
export const desc = 'Get an adorable avatar'
