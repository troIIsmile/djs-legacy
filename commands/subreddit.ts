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
    .then(data => data[0].data.children[0])
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
  message.channel.startTyping()
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
          description: `Please keep NSFW to NSFW channels. From Discord's Guidelines: 
          > The following is not tolerated. We will remove content and issue a warning. Subsequent misconduct and cases of extreme severity will result in account deletion:
          > ...
          > * Not properly labeling NSFW channels. Some content just isn't appropriate for kids under 18, so let's do the right thing in our community and label any channel containing adult content as NSFW. This will add an age gate to the channel, protecting those who wish not to see.
          > ...`
        }
      }
    }
  }
  message.channel.stopTyping()
  return {
    embed: {
      title: 'Error!',
      description: 'That subreddit does not exist!'
    }
  }
}

export const desc =
  'wholesome 100 - gives you a random post from the subreddit you choose'
