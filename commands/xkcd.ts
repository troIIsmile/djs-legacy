import { Message } from 'discord.js'

import fetch from 'node-fetch'
const template = {
  color: 0x6e6e6e,
  type: 'image',
  author: {
    name: 'xkcd',
    url: 'https://xkcd.com',
    iconURL:
      'https://pbs.twimg.com/profile_images/413359024617185280/pS8lVAWA_400x400.png'
  }
}
export const run = async (_message: Message, args: string[]) => {
  if (args[0] && isNaN(parseInt(args[0])))
    return {
      embed: {
        ...template,
        color: 0xff0000,
        description: "That isn't a number."
      }
    }
  try {
    const url =
      args.length > 0 && args[0].match(/^\d+$/)
        ? `https://xkcd.com/${args[0]}/info.0.json`
        : 'https://xkcd.com/info.0.json'
    const {
      year,
      month,
      day,
      alt: description,
      img,
      num,
      safe_title: title
    } = await fetch(url).then(res => res.json())
    return {
      embed: {
        ...template,
        title,
        timestamp: `${year}-${month}-${day}`,
        description,
        image: {
          url: img
        },
        url: `https://xkcd.com/${num}`,
      }
    }
  } catch (error) {
    return {
      embed: {
        ...template,
        color: 0xff0000,
        description: error.toString()
      }
    }
  }
}

export const desc = 'funny comic'
