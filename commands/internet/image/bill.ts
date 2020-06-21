import { Message, MessageOptions } from 'discord.js'

export async function run (message: Message): Promise<MessageOptions> {
  return {
    files: [{
      attachment: 'https://belikebill.ga/billgen-API.php?default=1&name=' + encodeURIComponent(message.member?.nickname || message.author.username),  
      name: 'bill.jpeg'
    }]
 } 
}
export const help = 'Be like Bill. Note: The API I used has no "they" for some reason.'
export const aliases = ['belikebill']
