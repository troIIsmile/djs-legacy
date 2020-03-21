import { Bot, Message } from 'jackbot-discord'
import getGames from 'nintendo-switch-eshop'
import { MessageEmbed as RichEmbed } from 'discord.js'
export async function run (message: Message, args: string[]): Promise<void> {
  const data = (await getGames()).find(e=>e.title.toLowerCase().includes(args.join(' ').toLowerCase()))
  if (data && data.title) {
    console.log(data)
     message.channel.send(
      new RichEmbed()
        .setTitle(data.title || '???')
        .addField('Price', ('$' + data.msrp) || '???')
        .setThumbnail('https://nintendo.com' + data.img)
        .addField('Players', data.players || '???')
        .addField('Categories', data.categories.join(', ') || '???')
        .addField('Characters', data.characters.join(', ') || '???')
        .addField('Rating', (`${data.esrb} (${data.esrbDescriptors.join(', ')})`) || '???')
        .setDescription(data.description || '???')
        .setAuthor(data.developers[0] || '???')
        .setURL('https://nintendo.com' + data.url)
        .setColor(0x6E6E6E)
        .setTimestamp(new Date(data.lastModified))
    )
  } else {
    message.channel.send(
      new RichEmbed()
        .setAuthor('Error')
        .setDescription('Couldn\'t find your game!')
        .setColor(0xFF0000)
    )
  }
}

export const desc = 'you will buy these thi'
