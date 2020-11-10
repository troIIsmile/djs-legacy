declare module 'google-tts-api' {
  export default function tts (
    text?: string,
    lang?: string,
    speed?: number
  ): Promise<string>
}
interface Array<T> {
  random (): T
}
