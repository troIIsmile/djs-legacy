import { Bot, Message } from 'jackbot-discord'
import getGames from 'nintendo-switch-eshop'
export async function run (message: Message, args: string[]): Promise<void> {
  const {title, msrp: price, img: thumbnail, characters, categories, developers, url, lastModified: timestamp, esrb, esrbDescriptors, description, players} = (await getGames()).find(e=>e.title.toLowerCase().includes(args.join(' ').toLowerCase()))
  if (title) {
     message.channel.send({
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
           value: ('$' + price) || '???'
         }, {
           name: 'Players',
           value: players || '???'
         }, {
           name: 'Categories',
           value: categories.join(', ') || '???'
         }, {
           name: 'Characters',
           value: characters.join(', ') || '???'
         }, {
           name: 'Rating',
           value: `${esrb} (${esrbDescriptors.join(', ')})`
         }]
       }
    })
  } else {
    message.channel.send({
        embed: {
          author: {
            name: 'Error'
          },
          description: 'Couldn\'t find your game!',
          color: 0xFF0000
        }
    })
  }
}

export const desc = 'you will buy these thi'
