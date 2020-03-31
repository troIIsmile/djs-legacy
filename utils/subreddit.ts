import {Message} from 'jackbot-discord'
import fetch from 'node-fetch'
interface Options {
  name: string,
  color: number
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
    const posts = (await fetch(`https://www.reddit.com/r/${options.name}.json`) // fetch the sub
                   .then(res=>res.json())) // turn it into data we can read
                   .data.children // array of posts
                   .filter((post: Post)=>post.data.url.startsWith('https://i.redd.it')) // only images
    const {data: {community_icon: iconURL}} = await fetch(`https://www.reddit.com/r/${options.name}/about.json`).then(res=>res.json())
    const {data: {title, author, created, url, permalink, ups}} = posts[Math.floor(Math.random() * posts.length)] // random post
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
        fields: [{
          name: 'Upvotes',
          value: ups
        }],
        color: options.color
      }
    }
  }   
}