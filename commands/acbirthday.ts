import {Message} from 'jackbot-discord'
import fetch from 'node-fetch'
export async function run (message: Message) {
  const date = new Date()
  message.channel.startTyping()
  const list = await fetch('https://www.animal-crossing.com/assets/data/birthdays.json').then(res=>res.json())
  const villager = list
    .map(({birthday, image, name})=>{
      const [day, month] = birthday.split('-')
      const birthdayd = new Date()
      birthdayd.setMonth((+month)-1)
      birthdayd.setDate(day)
      return {
          name,
          image,
          birthday: birthdayd
      }})
    .find(({birthday})=>{
        if (birthday.getDay() == date.getDay() && birthday.getMonth() == date.getMonth()) return true
    })
   message.channel.stopTyping()
  if (villager) return {
    embed: {
      title: `Today is ${villager.name}'s birthday!`,
      url: `https://nookipedia.com/wiki/${villager.name}`,
      image: {
        url: `https://www.animal-crossing.com/assets/img/characters/${villager.image}`
      },
      timestamp: date,
      author: {
        name: 'Data from the Animal Crossing website',
        url: 'https://www.animal-crossing.com/assets/data/birthdays.json',
        icon_url: 'https://www.animal-crossing.com/assets/icons/apple-touch-icon-180x180.png'
      }
    }
  }
  
  return {
    embed: {
        title: 'No villager has a birthday today!'
    }
  }
}

export const desc = "What Animal Crossing villager's birthday is it?"