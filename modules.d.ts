declare module 'google-tts-api' {
  export default function tts (
    text?: string,
    lang?: string,
    speed?: number
  ): Promise<string>;
}
