import {Message} from 'jackbot-discord'
import fetch from 'node-fetch'
interface Options {
  name: string,
  color: number,
  iconURL: string
}

interface Post {
  data: {
    author: string
    title: string
    created: number
    url: string
    permalink: string,
    ups: number
  }
}
interface Subreddit {
  data: {
    chidren: Post[]
  }
}
export default function (options: Options) {
  return async (message: Message) => {
    message.channel.startTyping()
    const {title, author, created, url, permalink, ups} = (await (await fetch(`https://www.reddit.com/r/${options.name}.json`)).json()).data.children.find((post: Post)=>post.data.url.startsWith('https://i.redd.it')).data
    await message.channel.send({
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
          iconURL: options.iconURL
        },
        image: {
          url
        },
        fields: [{
          name: 'Upvotes',
          value: ups
        }],
        color: options.color
      }
    })
    message.channel.stopTyping()
  }   
}