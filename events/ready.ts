import { Bot } from '../utils/types'
import random from '../utils/random'
// Some "Playing" messages from esmBot
import { all } from '../messages'

async function activityChanger (this: Bot) {
  // activityChanger from esmBot, also known as "the gamer code"
  this.user?.setActivity(random(all))
  setTimeout(() => activityChanger.call(this), 900000)
}

export default activityChanger
