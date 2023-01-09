const input = document.querySelector('input')
const button = document.querySelector('button')
const frame = document.getElementById('frame')
const counter = document.getElementById('counter')
const tag = document.createElement('script');
const firstScriptTag = document.getElementsByTagName('script')[0]

tag.src = "https://www.youtube.com/iframe_api"
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

let player
let checkInterval
let isCounterDisplayed = false

button.addEventListener('click', (event) => {
    event.preventDefault()
    const value = input.value
    const videoCode = value.length === 11 ? value : youtube_parser(value)
    playVideo(videoCode)
    resetInput()
})

function youtube_parser(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function playVideo(videoCode) {
    if (!videoCode) return alert('Błędny kod/link')
    console.log(videoCode)
    showVideoPlayer()
    player.loadVideoById(videoCode)
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
    })
}

function showVideoPlayer() {
    frame.style.visibility = 'visible'
}

function resetInput() {
    input.value = ''
}

checkInterval = setInterval(checkTime, 10)

function checkTime() {
    const duration = player.getDuration()
    const currentTime = player.getCurrentTime()
    const timeToTheEnd = Math.round(duration - currentTime)
    displayCounter(timeToTheEnd)
}

function displayCounter(time) {
    counter.textContent = ''
    if (time > 15) return
    counter.textContent = time
    if (time === 0) {
        counter.textContent = ''
    }
}


