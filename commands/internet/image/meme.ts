import { Message, MessageOptions } from 'discord.js';
import fetch from "node-fetch";
import { Bot } from '../../../utils/types';

export async function run (this: Bot, message: Message, args: string[]): Promise<string | MessageOptions> {
  const [text0 = '', text1 = ''] = args.join(' ').split('|');
  const rawResponse = await fetch('https://api.imgflip.com/caption_image?' + new URLSearchParams({
    username: process.env.IMGFLIP_USERNAME || '', password: process.env.IMGFLIP_PASSWORD || '', text0, text1, template_id: "61579"
  }).toString(), {
    method: 'POST',
  });
  const content: {
    success: true,
    data: {
      url: string;
      page_url: string;
    };
  } | {
    success: false;
    error_message: string;
  } = await rawResponse.json();

  if (content.success) {
    return content.data.page_url;
  } else {
    return {
      embed: {
        title: 'Imgflip error!',
        description: content.error_message
      }
    };
  }

}
export const help = 'make a meme using imgflip - split the text using "|"';
export const aliases = [];
