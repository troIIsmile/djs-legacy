export const run = async () => {return{
  files: [(await fetch('https://shibe.online/api/birds?urls=true&httpsUrls=true').then(res=>res.json()))[0]]
}}
export const desc = 'this bird DOES exist'