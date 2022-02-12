// select dom elements

const wrapper = document.querySelector(".wrapper");
const musicImg = document.querySelector(".wrapper .img-area img");
const musicName = wrapper.querySelector(".song-details .name");
const musicArtist = wrapper.querySelector(".song-details .artist");
const mainAudio = document.querySelector("#main-audio");
const playPauseBtn = document.querySelector(".wrapper .play-pause");
const allIcons = document.querySelector("i");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");
const musicCurrentTimeElem = wrapper.querySelector(".current");
const musicdurationElem = wrapper.querySelector(".duration");



// taking a index value for getting value from music list array
let musicIndex = 2;

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

// what will happen when user clicks on next button

nextBtn.addEventListener("click", () => {
    // calling nexMusic function to play next music
    nextMusic(); 


})
// function for playing next music
function nextMusic(){
    musicIndex++;
  // if musicIndex is greater then music array then music index will be 0 to code back first song
  // otherwise musicIndex variable will be same...
    if(musicIndex > musicList.length -1){
        musicIndex = 0;
    
    }else{
        musicIndex = musicIndex
    }
    loadMusic(musicIndex)
    playMusic()


}

// what will happen when user clicks on previous button

prevBtn.addEventListener("click", () => {
    // calling previous function to play next music
    prevMusic(); 


})
// function for playing next music
function prevMusic(){
    musicIndex--;
     // if musicIndex is less then music array then music index will be last index of music Array to go last  song of the array
  // otherwise musicIndex variable will be same...
    if(musicIndex < 0){
        musicIndex = musicList.length - 1;
    }else{
        musicIndex = musicIndex
    }
    loadMusic(musicIndex)
    playMusic()


}


// update progress bar acording to current music time

mainAudio.addEventListener("timeupdate", (event) => {
    
    // getting current time of the audio and duration
    const {currentTime, duration} = event.target;
    let progressWidth = (currentTime / duration) * 100;

    progressBar.style.width = `${progressWidth}%`
    

    // displaying current time in the ui
    musicCurrentTimeElem.innerText = convertMilliSec(currentTime);

    // if song is not loaded yet then audio duration will be NaN 
    // that's why i am takeing another event listener(loadeddata)
    mainAudio.addEventListener("loadeddata", () => {        
        // updating duration
        musicdurationElem.innerText = convertMilliSec(mainAudio.duration);
    })

  
    
})

// converting millisecond to minutes and seconds

function convertMilliSec(millis) {
   let totalMin = Math.floor(millis / 60);
   let totalSec = Math.floor(millis % 60)
   if(totalSec < 10){
       totalSec = `0${totalSec}`
   }
    return `${totalMin}:${totalSec}`
  }


  // code for when clicking in the progress area

  progressArea.addEventListener("click", event => {
      let progressWidthValue = progressArea.clientWidth;
      let songDuration = mainAudio.duration;
      let clickOffset = event.offsetX;
      
      mainAudio.currentTime = (clickOffset / progressWidthValue) * songDuration;
      playMusic();

  })




















