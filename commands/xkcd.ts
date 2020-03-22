import { Message } from 'jackbot-discord'

import fetch from 'node-fetch'

export const run = async (message: Message, args: string[]) => {
  if (args[0] && isNaN(parseInt(args[0]))) return message.channel.send(
    message.channel.send({
          embed: {
            type: 'image',
            author: {
              name: 'xkcd',
              url: 'https://xkcd.com',
              iconURL: 'https://pbs.twimg.com/profile_images/413359024617185280/pS8lVAWA_400x400.png'
            },
            color: 0xFF0000,
            description: 'That isn\'t a number.'
          }
      })
  )
  try {
    const url = args.length > 0 && args[0].match(/^\d+$/) ? `https://xkcd.com/${args[0]}/info.0.json` : "https://xkcd.com/info.0.json";
    const {year, month, day, alt: description, img, num, safe_title: title} = await (await fetch(url)).json()
    message.channel.send({
      embed: {
        title,
        timestamp: `${year}-${month}-${day}`,
        description,
        author: {
          name: 'xkcd',
          url: 'https://xkcd.com',
          iconURL: 'https://pbs.twimg.com/profile_images/413359024617185280/pS8lVAWA_400x400.png'
        },
        image: {
          url: img
        },
        url: `https://xkcd.com/${num}`,
        color: 0x6E6E6E
      }
    })
  } catch (error) {
      message.channel.send({
        embed: {
          author: {
            name: 'xkcd',
            url: 'https://xkcd.com',
            iconURL: 'https://pbs.twimg.com/profile_images/413359024617185280/pS8lVAWA_400x400.png'
          },
          color: 0xFF0000,
          description: error.toString()
        }
    })
}
}

export const desc = 'funny comic'
