import { get } from 'https'
export default function (url: string): unknown {
  return new Promise((resolve, reject) => {
    get(url, (resp) => {
      let data = ''

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        try {
          const result = JSON.parse(data)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })

    }).on("error", reject)
  })
}