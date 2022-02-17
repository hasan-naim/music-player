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
const musciListDiv= wrapper.querySelector(".music-list");
const ulTag= wrapper.querySelector("ul");


// selecting elements
const elements = {
    repeatBtn : selectElem("#repeat"),
    musicdurationElem: selectElem(".duration"),
    moreMusicBtn : selectElem("#more-music"),
    hideMoreMusic : selectElem("#close")
}


function selectElem (elem){
    const element = document.querySelector(elem)
    return element
}
function selectMulElem (elem){
    const element = document.querySelectorAll(elem)
    return element
}



// taking a index value for getting value from music list array
let musicIndex = 2;

window.addEventListener("load", ()=> {
    // calling loadMusic function to load music when website is loaded
    loadMusic(musicIndex);
    playingNow()

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
        elements.musicdurationElem.innerText = convertMilliSec(mainAudio.duration);
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



// code for repeat button

elements.repeatBtn.addEventListener("click", ()=> {
    // first get the inner text of the icon

    let getText = elements.repeatBtn.innerText;
    //then check and change the icon

    switch (getText) {
        case "repeat":
            elements.repeatBtn.innerText = "repeat_one";
            elements.repeatBtn.setAttribute("title", "repeat this playlist")
            break;
        case "repeat_one":
            elements.repeatBtn.innerText = "shuffle";
            elements.repeatBtn.setAttribute("title", "repeat none")
        break;
        case "shuffle":
            elements.repeatBtn.innerText = "repeat";
            elements.repeatBtn.setAttribute("title", "repeat this song")
        break;

        default:
            break;
    }
    
})

// play music acording to the repeat button

mainAudio.addEventListener("ended", () => {
    let getText = elements.repeatBtn.innerText;
    //then check and change the icon

    switch (getText) {
        // if the icon is repeat we will simply play the next song
        case "repeat":
            nextMusic()

            break;
        // if icon is repeat one song then we will change the current time to 0    
        case "repeat_one":
            mainAudio.currentTime = 0
            playMusic()
            break;
        case "shuffle":
            
            nextMusic()
        break;

        default:
            break;
    }
})


// more music list


elements.moreMusicBtn.addEventListener("click", ()=>{
    musciListDiv.classList.toggle("show")


})

elements.hideMoreMusic.addEventListener("click" ,() => {
    elements.moreMusicBtn.click()
})

// print li into ul

musicList.forEach(element => {
    const html = `<li>
    <div class="row">
      <span>${element.name}</span>
      <p>${element.artist}</p>
    </div>
    <audio src="./musics/${element.src}.mp3" id=${element.src}></audio>
    <span class=${element.src}></span>
  </li>
  `

  ulTag.insertAdjacentHTML("beforeend", html)

  let liAudio = selectElem(`#${element.src}`)
  let liDuration = selectElem(`.${element.src}`)
  liAudio.addEventListener("loadeddata", () => {        
    // updating duration
    
    liDuration.innerText = convertMilliSec(liAudio.duration);
})

  
});

// playing particular song on click

function playingNow() {
    const allLiTag= document.querySelectorAll("ul li");

allLiTag.forEach((element, index)=>{
    element.setAttribute("onclick", "clickFunc(this)")
    element.setAttribute("li-index", `${index}`)

    if(element.classList.contains("playing")){
        element.classList.remove("playing")
    }
    // if there is a li tag that match musicIndex
    //that means that song is playing and we will style it

    if(element.getAttribute("li-index") == musicIndex){
        element.classList.add("playing")
    }

    
})
}


function clickFunc(element){
    let getIndex = element.getAttribute("li-index")
    musicIndex = getIndex;
    loadMusic(musicIndex)
    playMusic()
    playingNow()
}











