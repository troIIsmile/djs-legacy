import { Bot, Message } from 'jackbot-discord'
import getGames from 'nintendo-switch-eshop'
export async function run (message: Message, args: string[]): Promise<void> {
  message.channel.startTyping()
  const {
    msrp: price,
    img: thumbnail,
    lastModified: timestamp,
    title,
    characters,
    categories,
    developers,
    url,
    esrb,
    esrbDescriptors,
    description,
    players
  } = (await getGames()).find(e=>e.title.toLowerCase().includes(args.join(' ').toLowerCase()))
  if (title) {
     await message.channel.send({
       embed: {
         image: 'https://nintendo.com' + thumbnail,
         title,
         description,
         timestamp,
         url: 'https://nintendo.com' + url,
         author: {
           name: developers[0] || '???'
         },
         color: 0x6E6E6E,
         fields: [{
           name: 'Price',
           value: ('$' + price) || '???',
           inline: true,
         }, {
           name: 'Players',
           value: players || '???',
           inline: true,
         }, {
           name: 'Categories',
           value: categories.join(', ') || '???',
           inline: true
         }, {
           name: 'Characters',
           value: characters.join(', ') || '???',
           inline: true
         }, {
           name: 'Rating',
           value: `${esrb} (${esrbDescriptors.join(', ')})`,
           inline: true
         }]
       }
    })
  } else {
    await message.channel.send({
        embed: {
          author: {
            name: 'Error'
          },
          description: 'Couldn\'t find your game!',
          color: 0xFF0000
        }
    })
  }
  message.channel.stopTyping()
}

export const desc = 'you will buy these thi'
