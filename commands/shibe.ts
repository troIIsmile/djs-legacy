export const run = async () => {return{
  files: [(await fetch('https://shibe.online/api/shibes?urls=true&httpsUrls=true').then(res=>res.json()))[0]]
}}
export const desc = 'this shibe DOES exist'
