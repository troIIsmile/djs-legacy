export const run = async () => {return{
  files: [(await fetch('https://shibe.online/api/cats?urls=true&httpsUrls=true').then(res=>res.json()))[0]]
}}
export const desc = 'this cat DOES exist'
