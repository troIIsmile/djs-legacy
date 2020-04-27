import { Message } from 'discord.js'
import fetch from 'node-fetch'
interface Options {
  name: string
  color: number
}

interface Post {
  data: {
    author: string
    title: string
    created: number
    url: string
    permalink: string
    ups: number
  }
}
interface Subreddit {
  data: {
    children: Post[]
  }
}

async function getPost (sub: string): Promise<Post> {
  const result = await fetch(`https://www.reddit.com/r/${sub}/random.json`)
    .then(res => res.json())
    .then(data => data[0].data.children[0])
  if (result.data.url.startsWith('https://i.redd.it')) return result
  return getPost(sub)
}

export default function (options: Options) {
  return async (message: Message) => {
    message.channel.startTyping()
    const {
      data: { community_icon: iconURL }
    } = await fetch(`https://www.reddit.com/r/${options.name}/about.json`).then(
      res => res.json()
    )
    const {
      data: { title, author, created, url, permalink, ups }
    } = await getPost(options.name) // random post
    message.channel.stopTyping()
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
          text: 'r/' + options.name,
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
        color: options.color
      }
    }
  }
}
