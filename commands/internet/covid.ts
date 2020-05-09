import fetch from 'node-fetch'
import { Message } from 'discord.js'
const wdk = require('wikibase-sdk')({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql'
})
export const desc = 'funny virus'
export async function run (message: Message) {
  message.channel.startTyping()
  const url = wdk.getEntities({
    ids: 'Q81068910',
    languages: ['en'] // returns all languages if not specified
  })
  const {
    Q81068910: {
      claims: { P8010: recovered, P1603: confirmed, P1120: deaths }
    }
  } = await fetch(url)
    .then(res => res.json())
    .then(wdk.parse.wd.entities)
  message.channel.stopTyping()
  return {
    embed: {
      author: {
        name: 'COVID-19',
        iconURL:
          'https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png'
      },
      title: 'Statistics',
      url: 'https://www.wikidata.org/wiki/Q81068910',
      fields: [
        {
          name: '☠ Deaths',
          value: deaths[deaths.length - 1],
          inline: true
        },
        {
          name: '🤒 Cases',
          value: confirmed[confirmed.length - 1],
          inline: true
        },
        {
          name: '✔ Recoveries',
          value: recovered[recovered.length - 1],
          inline: true
        }
      ]
    }
  }
}
