// select dom elements

const wrapper = document.querySelector(".wrapper");
const musicImg = document.querySelector(".wrapper .img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const mainAudio = document.querySelector("#main-audio");
const playPauseBtn = document.querySelector(".wrapper .play-pause");
// const wrapper = document.querySelector("");
// const wrapper = document.querySelector("");

// taking a index value for getting value from music list array
let musicIndex = 3;

window.addEventListener("load", ()=> {
    // calling loadMusic function to load music when website is loaded
    loadMusic(musicIndex);

})

function loadMusic(indexNumb){

    musicName.innerText = musicList[indexNumb].name;
    musicArtist.innerText = musicList[indexNumb].artist;
    musicImg.src = `./images/${musicList[indexNumb].img}.jpg`
    mainAudio.src = `./musics/${musicList[indexNumb].src}.mp3`
}


// playing music when user clicks on play button
function playMusic(){
    wrapper.classList.add("paused")
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play()
}

// pausing music when user clicks on pause button

function pauseMusic(){
    wrapper.classList.remove("paused")
    mainAudio.pause()
    playPauseBtn.querySelector("i").innerText = "play_arrow";

}

// if user clicks on play pause button I will first check if it is paused or playing...
// if it is paused then call play function otherwise call pause function.

playPauseBtn.addEventListener("click", () => {
    let isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic(): playMusic();

})

console.log(mainAudio)































