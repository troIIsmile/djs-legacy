<div align="center">
	<img width="360" src="https://raw.githubusercontent.com/Jack5079/nxtbot/master/docs/icon.png" alt="NXTBOT">
</div>

# NXTBOT

A terrible Discord bot.

## Migrating from everythingbot/jackbot?

-say → -tts

-stats → -about

-saybot → -say

-sayvc → -ttsvc

## How to install?

### Normal

1. Install dependencies:

```bash
sudo apt install ffmpeg # Soon this won't be the case
npm i
```

2. Rename `.env.example` to `.env`

3. Open `.env` and:
   1. Replace the text after `TOKEN=` with your bot's token
   2. Replace the text after `OWNER=` with your Discord ID.
   3. You can also add `SUPPORT=` if you have a support server. You don't need to, however.

4. Compile the bot by running `npm run build` in your terminal.

### Glitch

[Click here to remix.](https://glitch.com/edit/#!/remix/nxtbot)
After remixing, open the terminal and type `npx tsc`. After that, follow step 3 of the normal route.

## Website
`npx serve docs`

## Donate

haha no this bot is terrible
