export const run = async () => ({
  files: [(await fetch('https://shibe.online/api/cats?urls=true&httpsUrls=true').then(res=>res.json()))[0]]
})
export const help = 'this cat DOES exist'
