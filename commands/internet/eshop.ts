import { Message } from 'discord.js'
import getGames from 'nintendo-switch-eshop'
interface Game {
  msrp: number
  img: string
  lastModified: number
  title: string
  characters: string[]
  categories: string[]
  developers: string[]
  url: string
  esrb: string
  esrbDescriptors: string[]
  description: string
  players: string
}
const error = {
  embed: {
    author: {
      name: 'Error'
    },
    description: "Couldn't find your game!",
    color: 'RED'
  }
}

export async function run (message: Message, args: string[]) {
  message.channel.startTyping()
  try {
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
    } = <Game> <unknown>(
      (await getGames()).find(game =>
        game.title.toLowerCase().includes(args.join(' ').toLowerCase())
      )
    )
    if (title) {
      await message.channel.send({
        embed: {
          image: {
            url: 'https://nintendo.com' + thumbnail
          },
          title,
          description: description.replace(/\*/g, '\\*'),
          timestamp,
          url: 'https://nintendo.com' + url,
          author: {
            name: developers[0] || '???'
          },
          color: 0xfe7c02,
          fields: [
            {
              name: 'Price',
              value: '$' + price || '???',
              inline: true
            },
            {
              name: 'Players',
              value: players || '???',
              inline: true
            },
            {
              name: 'Categories',
              value: categories.join(', ') || '???',
              inline: true
            },
            {
              name: 'Characters',
              value: characters.join(', ') || '???',
              inline: true
            },
            {
              name: 'Rating',
              value: `${esrb} (${esrbDescriptors.join(', ')})`,
              inline: true
            }
          ]
        }
      })
    } else {
      return error
    }
  } catch (e) {
    return error
  } finally {
    message.channel.stopTyping()
  }
}

export const help = 'you will buy these thi'
