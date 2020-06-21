import fetch from 'node-fetch'
export const help = 'orange man badyyyyyyyyy! give me upvote!!!!'
export const run = async () => {
  const data = await fetch('https://api.tronalddump.io/random/quote').then(res => res.json())
  return {
    embed: {
      author: {
        name: 'Donald J. Trump',
        iconURL: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg',
        url: 'https://twitter.com/realDonaldTrump'
      },
      description: data.value,
      title: '',
      timestamp: new Date(data.appeared_at),
      color: 0x1DA1F2, // try running "-color 1DA1F2" in the bot
      footer: {
        text: 'Tronald Dump API',
        icon_url: 'https://www.tronalddump.io/img/tronalddump_850x850.png'
      },
      fields: [{
        name: 'Source',
        value: data._embedded.source[0].url,
      }]
    }
  }
}
