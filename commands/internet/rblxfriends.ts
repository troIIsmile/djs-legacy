import { Message } from 'discord.js'
import fetch from 'node-fetch'
interface RobloxFriend {
  AvatarUri: string // I want to use this
  Id: number
  Username: string
  AvatarFinal: boolean // ?????????????????????????
  IsOnline: boolean
}
export const run = async (message: Message, args: string[]) => {
  if (!args.join('').length) {
    return {
      embed: {
        author: {
          name: 'Error!'
        },
        title: 'Please provide a username!',
        color: 'RED'
      }
    }
  }
  const { Id: id } = await fetch(
    'https://api.roblox.com/users/get-by-username?username=' +
      encodeURIComponent(args.join(' '))
  ).then(res => res.json())
  if (!id) {
    return {
      embed: {
        author: {
          name: 'Error!'
        },
        title: "That player couldn't be found!",
        color: 'RED'
      }
    }
  }
  const friendarray = await fetch(
    `https://api.roblox.com/users/${id}/friends`
  ).then(res => res.json())
  if (!friendarray) {
    return {
      embed: {
        author: {
          name: 'Error!'
        },
        title: 'There was a problem getting the list of friends',
        color: 'RED'
      }
    }
  }
  const fields = friendarray.map((friend: RobloxFriend) => {
    return {
      name: friend.Username,
      value: friend.IsOnline ? '🟢 Online' : '🔴 Offline',
      inline: true
    }
  })
  return {
    embed: {
      author: {
        name: args.join(' '),
        iconURL: `https://roblox.com/Thumbs/Avatar.ashx?x=420&y=420&username=${encodeURIComponent(
          args.join(' ')
        )}`,
        url: `https://www.roblox.com/users/${id}/`
      },
      fields
    }
  }
}
export const desc = 'username -> info'
