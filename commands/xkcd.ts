import { MessageEmbed as RichEmbed } from 'discord.js'
import { Message } from 'jackbot-discord'

import fetch from 'node-fetch'

export const run = async (message: Message, args: string[]) => {
  if (isNaN(parseInt(args[0]))) return message.channel.send(
    new RichEmbed()
      .setAuthor('XKCD', 'https://pbs.twimg.com/profile_images/413359024617185280/pS8lVAWA_400x400.png')
      .addField('Error', 'That isn\'t a number!', true)
      .setColor(0xFF0000)
  )
  try {
    const url = args.length > 0 && args[0].match(/^\d+$/) ? `https://xkcd.com/${args[0]}/info.0.json` : "https://xkcd.com/info.0.json";
    const data = await (await fetch(url)).json()
    message.channel.send(
      new RichEmbed()
        .setTitle(data.safe_title)
        .setImage(data.img)
        .setDescription(data.alt)
        .setAuthor('XKCD', 'https://pbs.twimg.com/profile_images/413359024617185280/pS8lVAWA_400x400.png')
        .setURL(`https://xkcd.com/${data.num}`)
        .setColor(0x6E6E6E)
        .setTimestamp(new Date(`${data.year}-${data.month}-${data.day}`))
    )
  } catch (error) {
    message.channel.send(new RichEmbed()
      .setAuthor('XKCD', 'https://pbs.twimg.com/profile_images/413359024617185280/pS8lVAWA_400x400.png')
      .addField('Error', error, true)
      .setColor(0xFF0000))
  }
}

export const desc = 'funny comic'
