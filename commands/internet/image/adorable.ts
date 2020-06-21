import { Message, MessageOptions } from 'discord.js'
export async function run (message: Message): Promise<MessageOptions> {
  return {
    files: [`https://api.adorable.io/avatars/2048/${message.author.username}.png`]
  }
}
export const help = 'Get an adorable avatar'
