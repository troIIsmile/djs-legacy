import { MessageEmbed as RichEmbed } from 'discord.js'
import { Message } from 'jackbot-discord'

import fetch from '../modules/fetch'

export const run = async (message: Message, args: string[]) => {
  try {
    const url = args.length > 0 && args[0].match(/^\d+$/) ? `https://xkcd.com/${args[0]}/info.0.json` : "https://xkcd.com/info.0.json";
    const data = await fetch(url)
    message.channel.send(
      new RichEmbed()
        .setTitle(data.safe_title)
        .setImage(data.img)
        .setDescription(data.alt)
        .setAuthor('XKCD', 'https://dogechain.info/favicon.png')
        .setURL(`https://xkcd.com/${data.num}`)
        .setColor(0x89c496)
        .setTimestamp(new Date(`${data.year}-${data.month}-${data.day}`))
    )
  } catch (error) {
    message.channel.send(new RichEmbed()
      .setAuthor('XKCD', 'https://dogechain.info/favicon.png')
      .addField('Error', error, true)
      .setColor(0xFF0000))
  }
}

export const desc = 'funny comic'
