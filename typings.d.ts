declare module 'google-tts-api' {
  export function getAudioUrl (
    text: string,
    options: {
      lang: string,
      slow: boolean, // speed (number) is changed to slow (boolean)
      host: 'https://translate.google.com', // allow to change the host
    }
  ): string
}
interface Array<T> {
  random (): T
}
