import { MessageOptions } from 'discord.js'
import fetch from 'node-fetch'
export async function run (_: any, args: string[]): Promise<MessageOptions> {
  const { html_url: url, avatar_url: iconURL, created_at, bio: description, public_repos, public_gists, followers, following } = await fetch('https://api.github.com/users/' + encodeURI(args.join('_')))
    .then(res => res.json())

  return {
    embed: {
      author: {
        url, iconURL,
        name: args.join('_')
      },
      timestamp: new Date(created_at),
      description,
      provider: {
        name: 'GitHub',
        url: 'https://github.com'
      },
      fields: [{
        name: 'Public Repos',
        value: public_repos
      }, {
        name: 'Public Gists',
        value: public_gists
      }, {
        name: 'Followers',
        value: followers
      }, {
        name: 'Following',
        value: following
      }].map((obj) => ({
        ...obj, inline: true
      }))
    }
  }
}
export const desc = 'Get info about a GitHub user.'
export const aliases = ['github']
