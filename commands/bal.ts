import { MessageEmbed as RichEmbed } from 'discord.js'
import { Message } from 'jackbot-discord'

import fetch from 'node-fetch'

export const run = async (message: Message, args: string[]) => {
  try {
    const {balance} = await (await fetch('https://dogechain.info/api/v1/address/balance/' + encodeURIComponent(args.join(' ')))).json()
    message.channel.send(new RichEmbed()
      .setAuthor('Dogechain', 'https://dogechain.info/favicon.png')
      .addField('Balance', balance + ' DOGE', true)
      .setColor(0x89c496))
  } catch (error) {
    message.channel.send(new RichEmbed()
      .setAuthor('Dogechain', 'https://dogechain.info/favicon.png')
      .addField('Error', error, true)
      .setColor(0xFF0000))
  }
}

export const desc = 'see how much DOGE dogecoin addresses have'
