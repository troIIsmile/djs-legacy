import { Message } from 'discord.js'
import fetch from 'node-fetch'
interface Post {
  data: {
    author: string
    title: string
    created: number
    url: string
    permalink: string
    ups: number
    over_18: boolean
  }
}

async function getPost (sub: string): Promise<Post> {
  const result: Post = await fetch(
    `https://www.reddit.com/r/${sub}/random.json`
  )
    .then(res => res.json())
    .then(data => data[0].data.children[0]) // It's a SINGLE POST just give me the post it shouldn't have children what the fuck is the Reddit API
  if (result.data.url.startsWith('https://i.redd.it')) return result
  return getPost(sub)
}

export async function run (message: Message, args: string[]) {
  if (!args.join('').length || args.join('_').length > 21) {
    return {
      embed: {
        title: 'Error!',
        description: 'That subreddit does not exist!'
      }
    }
  }
  const about = await fetch(
    `https://www.reddit.com/r/${encodeURI(args.join('_'))}/about.json`
  ).then(res => res.json())
  if (about.data.description) {
    const {
      data: { community_icon: iconURL, display_name_prefixed: text }
    } = about
    const {
      data: { title, author, created, url, permalink, ups, over_18 }
    } = await getPost(encodeURI(args.join('_'))) // random post
    message.channel.stopTyping()
    if (('nsfw' in message.channel && message.channel.nsfw) || !over_18) {
      return {
        embed: {
          timestamp: created * 1000,
          url: 'https://reddit.com' + permalink,
          author: {
            name: author,
            url: 'https://reddit.com/u/' + author
          },
          title,
          footer: {
            text,
            iconURL
          },
          image: {
            url
          },
          fields: [
            {
              name: 'Upvotes',
              value: ups
            }
          ],
          color: 0xff4500
        }
      }
    } else {
      return {
        embed: {
          title: 'Error!',
          description: 'The bot found a NSFW post. As this is a SFW channel, this bot can not post NSFW content here without breaking Discord\'s Community Guidelines.'
        }
      }
    }
  }
  return {
    embed: {
      title: 'Error!',
      description: 'That subreddit does not exist!'
    }
  }
}

export const help =
  'wholesome 100 - gives you a random post from the subreddit you choose'

export const aliases = ['subreddit', 'r/']
