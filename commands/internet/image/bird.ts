export const run = async () => ({
  files: [(await fetch('https://shibe.online/api/birds?urls=true&httpsUrls=true').then(res=>res.json()))[0]]
})
export const help = 'this bird DOES exist'
