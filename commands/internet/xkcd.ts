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
interface Comic {
  month: string
  num: number
  link: string
  year: string
  news: string
  safe_title: string
  transcript: string
  alt: string
  img: string
  title: string
  day: string
}
export const run = async (_message: Message, [comicnum]: [string]) => {
  if (comicnum && isNaN(parseInt(comicnum))) {
    return {
      embed: {
        ...template,
        color: 'RED',
        description: "That isn't a number."
      }
    }
  }
  try {
    const url =
      comicnum && comicnum.match(/^\d+$/)
        ? `https://xkcd.com/${comicnum}/info.0.json`
        : 'https://xkcd.com/info.0.json'
    const {
      year,
      month,
      day,
      alt: description,
      img,
      num,
      safe_title: title
    }: Comic = await fetch(url).then(res => res.json())
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
        color: 'RED',
        description: error.toString()
      }
    }
  }
}

export const help = 'funny comic'
