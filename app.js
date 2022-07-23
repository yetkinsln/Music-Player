const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const player = new MusicPlayer(musicList);
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
let music = player.getMusic();
const ul = document.querySelector("ul");


window.addEventListener("load", ()=>{
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlayingNow();
});
function displayMusic(music){
    title.innerText = music.getName();
    singer.innerText =music.singer;
    image.src = "img/" +music.img;
    audio.src = "mp3/" +music.file;
}

play.addEventListener("click", () =>{
    const isMusicPlay = container.classList.contains("playing");
if(isMusicPlay){
    pauseMusic();
}else{
    playMusic();
}

});
function pauseMusic() {
container.classList.remove("playing");
play.querySelector("i").classList = "fa-solid fa-play";
audio.pause();
}
function playMusic() {
    container.classList.add("playing")
    play.querySelector("i").classList = "fa-solid fa-pause";
audio.play();
}

prev.addEventListener("click", () =>{
    prevMusic();
});
function prevMusic(){
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();

}
next.addEventListener("click",()=>{
nextMusic();
});
function nextMusic(){
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}
const calculateTime = (topsaniye) =>{
    const dakika = Math.floor(topsaniye/60);
    const saniye = Math.floor(topsaniye % 60);
    if(saniye<10){
        const guncellenenSaniye = "0"+ saniye;
        const sonuc = dakika.toString()+":"+guncellenenSaniye.toString();
        return sonuc;
    }else{
        const guncellenenSaniye = saniye;
        const sonuc = dakika.toString()+":"+guncellenenSaniye.toString();  
          return sonuc;
    }
}
audio.addEventListener("loadedmetadata",()=>{
duration.textContent = calculateTime(audio.duration);
progressBar.max = Math.floor(audio.duration);
});
audio.addEventListener("timeupdate", () =>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(audio.currentTime);
});

progressBar.addEventListener("input", () =>{
currentTime.textContent = calculateTime(progressBar.value);
audio.currentTime = progressBar.value;
})
let muteState = "unmuted";
let volumestat = volumeBar.value;
volumeBar.addEventListener("input",(e)=>{
    volumestat = volumeBar.value;
    const value = e.target.value;
audio.volume = value/100;
if(value==0){
    volume.classList = "fa-solid fa-volume-mute";
    muteState = "muted";
}
else{
    volume.classList = "fa-solid fa-volume-high"; 
    muteState = "unmuted";
}
})
volume.addEventListener("click", ()=>{
  if(muteState == "unmuted"){
    volumeBar.value = 0;
    volume.classList = "fa-solid fa-volume-mute";
    muteState = "muted";
    audio.muted = true;
    valuestat =0;
  }else{
    if(volumestat ==0){
        volumestat = 10;
        audio.volume = volumestat/100;
    }
    volumeBar.value = volumestat;
    volume.classList = "fa-solid fa-volume-high";
    muteState = "unmuted";
    audio.muted = false;
  }
})

const displayMusicList = (list) =>{

    for(let i = 0; i< list.length;i++){
        let liTag= '<li li-index='+i+' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center"><span>' + musicList[i].getName() +'</span><span class="badge bg-primary rounded-pill" id = "music-'+i+'"></span></li><audio class="music-'+i+'" src="mp3/'+musicList[i].file+'"></audio>';
        ul.insertAdjacentHTML("beforeend",liTag);
        let liAudioDuration = ul.querySelector("#music-" + i);
        let liAudioTag = ul.querySelector(".music-" + i);
        liAudioTag.addEventListener("loadeddata", ()=>{
liAudioDuration.innerText = calculateTime(liAudioTag.duration);
        });
    
    }
}
const selectedMusic = (li) =>{
const index = li.getAttribute("li-index");
player.index = index;
displayMusic(player.getMusic());
playMusic();
isPlayingNow();
}

const isPlayingNow =() =>{
    for(let li of ul.querySelectorAll("li")){
        if(li.classList.contains("playing")){
            li.classList.remove("playing");
        }
        if(li.getAttribute("li-index")== player.index){
            li.classList.add("playing");
        }
    }
}

audio.addEventListener("ended",()=>{
    nextMusic();
})