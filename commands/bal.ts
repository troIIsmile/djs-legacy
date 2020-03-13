import { MessageEmbed as RichEmbed } from 'discord.js'
import { Message } from 'jackbot-discord'
import { get } from 'https'

function getbal (url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    get(url, (resp) => {
      let data = ''

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        resolve(JSON.parse(data).balance)
      })

    }).on("error", reject)
  })
}
export const run = async (message: Message, args: string[]) => {
  try {
    const balance = await getbal('https://dogechain.info/api/v1/address/balance/' + encodeURIComponent(args.join(' ')))
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
