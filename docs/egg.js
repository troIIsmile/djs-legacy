/* eslint-env browser */
let count = 0
const play = document.getElementById('play')
const svg = document.getElementById('logo')
const text = document.getElementById('text')
play.addEventListener('click', ()=>{
  if (count++ < 1) {
    svg.animate([
      { transform: 'skew(0deg)'},
      { transform: 'skew(11deg)'}
    ], {
      duration: 1000,
      fill: 'forwards'
    })
    text.animate([
      { opacity: 1},
      { opacity: 0 }
    ], {
      duration: 1000,
      fill: 'forwards'
    })
  } else {
    document.getElementById('music')?.remove()
    const video = document.createElement('iframe')
    video.id = 'music'
    video.style.display = 'none'
    switch (count) {
    case 2:
      video.src = 'https://www.youtube.com/embed/FTOAe-zL9kA?autoplay=1'
      break
    default:
      count = 0
      text.animate([
        { opacity: 0},
        { opacity: 1 }
      ], {
        duration: 1000,
        fill: 'forwards'
      })
      svg.animate([
        { transform: 'skew(11deg)'},
        { transform: 'skew(0deg)'}
      ], {
        duration: 1000,
        fill: 'forwards'
      })
    }
    document.body.appendChild(video)
  }
})
