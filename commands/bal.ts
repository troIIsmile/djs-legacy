import { Message } from 'jackbot-discord'

import fetch from 'node-fetch'

export const run = async (message: Message, args: string[]) => {
  try {
    const {balance} = await (await fetch('https://dogechain.info/api/v1/address/balance/' + encodeURIComponent(args.join(' ')))).json()
    message.channel.send({
      embed: {
        author: {
          name: 'Dogechain',
          url: 'https://dogechain.info',
          iconURL: 'https://dogechain.info/favicon.png'
        },
        color: 0x89c496,
        fields: [{
          name: 'Balance',
          value: balance + ' DOGE',
          inline: true
        }]
      }
    })
  } catch (error) {
    message.channel.send({
      embed: {
        author: {
          name: 'Dogechain',
          url: 'https://dogechain.info',
          iconURL: 'https://dogechain.info/favicon.png'
        },
        description: 'Error! \n' + error,
        color: 0xFF0000
      }
    })
  }
}

export const desc = 'see how much DOGE dogecoin addresses have'
