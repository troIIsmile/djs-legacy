import fetch from 'node-fetch'

export const run = async (_: void, args: string[]) => {
  try {
    const {balance} = await fetch('https://dogechain.info/api/v1/address/balance/' + encodeURIComponent(args.join(' '))).then(res=>res.json())
    return {
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
    }
  } catch (error) {
    return {
      embed: {
        author: {
          name: 'Dogechain',
          url: 'https://dogechain.info',
          iconURL: 'https://dogechain.info/favicon.png'
        },
        description: 'Error! \n' + error,
        color: 'RED'
      }
    }
  }
}

export const help = 'see how much DOGE dogecoin addresses have'
