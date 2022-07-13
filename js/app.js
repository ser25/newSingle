const player = document.querySelector('.newSingle__body');
const playBtn = document.querySelector('.newSingle__playPause');
const audio = document.querySelector('.newSingle__song');
const progressContainer = document.querySelector('.newSingle__bar ');
const progress = document.querySelector('.bar__progress');
const title = document.querySelector('.newSingle__songName');
const cover = document.querySelector('.player__img');
const imgSrc = document.querySelector('.Play');
//Назви пісень
const songsArray = ['Let me down slowly',
                     'Summertime Sadness',
                      'Another love'
                    ];
//Пісня по умолчанію
let songIndex = 0;
//init 
console.log(audio)
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
}  
loadSong(songsArray[songIndex]);
//Play
function playSong() {
    player.classList.add('_play');
    audio.play();
    imgSrc.src = `../images/newSingl/pause-solid.svg`;
}
//Pause
function pauseSong() {
    player.classList.remove('_play');
    audio.pause();
    imgSrc.src = `../images/newSingl/play-solid.svg`;
}
playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('_play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

function nextSong() {
    songIndex++;
    if (songIndex > songsArray.length - 1){
        songIndex = 0;
    }
    loadSong(songsArray[songIndex]);
    playSong();
}
nextBtn.addEventListener('click', nextSong);

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songsArray.length - 1;
    }
    loadSong(songsArray[songIndex]);
    playSong();
}
prevBtn.addEventListener('click', prevSong);

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    console.log(duration);
    console.log(currentTime);
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

}
audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;

}
progressContainer.addEventListener('click', setProgress);

//AutoPlay

audio.addEventListener('ended', nextSong);