import random from "./random";
import { randexp } from 'randexp';
import Twitter from 'twitter-api-client';

export const data: {
  videos: string[],
  phrases: (RegExp | string)[];
} = {
  phrases: [
    // 8-bit
    /Now we (WISH|wish) we had a handheld version of (Spiderman|Sweet Victory|Obama)! (😎)?/,
    // fun fact
    /Fun fact: ((dog|popbob) is real|comedy|Oil)?/,
    'awesome', 'gaming', 'The PlayStation 5',
  ],
  videos: [
    'https://twitter.com/i/status/1294790286409859072/video/1',
    'https://twitter.com/i/status/1294691340803022862/video/1',
    'https://twitter.com/i/status/1294457344819068929/video/1',
    'https://twitter.com/i/status/1294437085198286850/video/1',
    'https://twitter.com/i/status/1294182069225033728/video/1',
    'https://twitter.com/i/status/1294320925266108418/video/1'
  ]
};

export function randomPhrase (): string {
  const phrase = random(data.phrases);
  if (typeof phrase === 'string') return phrase;
  return randexp(phrase);
}

if (require.main) {
  console.log(randomPhrase(), random(data.videos));
}
export default process.env.TWITTER_CONSUMER_TOKEN && process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_ACCESS_TOKEN && process.env.TWITTER_ACCESS_SECRET ? new Twitter({
  apiKey: process.env.TWITTER_CONSUMER_TOKEN,
  apiSecret: process.env.TWITTER_CONSUMER_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_SECRET
}) : undefined;
