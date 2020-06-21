import { MessageOptions } from 'discord.js'
import fetch from 'node-fetch'
export async function run (_: any, args: string[]): Promise<MessageOptions> {
  const { html_url: url, avatar_url: iconURL, created_at, bio: description, public_repos, public_gists, followers, following } = await fetch('https://api.github.com/users/' + encodeURI(args.join('_')))
    .then(res => res.json())
  if (!url) {
    return {
      embed: {
        title: "That user doesn't exist!",
        color: 'RED',
        footer: {
          text: 'GitHub',
          iconURL: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
        }
      }
    }
  }
  return {
    embed: {
      author: {
        url, iconURL,
        name: args.join('_')
      },
      timestamp: new Date(created_at),
      description,
      footer: {
        text: 'GitHub',
        iconURL: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
      },
      fields: [{
        inline: true,
        name: 'Public Repos',
        value: public_repos
      }, {
        inline: true,
        name: 'Public Gists',
        value: public_gists
      }, {
        inline: true,
        name: 'Followers',
        value: followers
      }, {
        inline: true,
        name: 'Following',
        value: following
      }]
    }
  }
}
export const help = 'Get info about a GitHub user.'
export const aliases = ['github']
