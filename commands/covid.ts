import fetch from 'node-fetch'
export const desc = 'funny virus'
export async function run ({channel}) {
  channel.startTyping()
  const { data: {confirmed, deaths, recovered}, dt: timestamp} = await fetch('https://covid2019-api.herokuapp.com/v2/total').then(res=>res.json())
  channel.stopTyping()
  return {
    embed: {
      author: {
        name: 'COVID-19',
        iconURL: 'https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png'
      },
      title: 'Statistics',
      url: 'https://github.com/nat236919/Covid2019API',
      fields: [{
        name: '☠ Deaths',
        value: deaths,
        inline: true
      }, {
        name: '🤒 Cases',
        value: confirmed,
        inline: true
      }, {
        name: '✔ Recoveries',
        value: recovered,
        inline: true
      }],
      timestamp
    }
  }
}