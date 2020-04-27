import { Bot } from '../utils/types'
export const run = (_: void, __: void, client: Bot) =>
  client.generateInvite(['ADMINISTRATOR'])
export const desc = 'add me to your server'
