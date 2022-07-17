const player = document.querySelector('.newSingle__body');
const playBtn = document.querySelector('.plays');
const audio = document.querySelector('.newSingle__song');
const progressContainer = document.querySelector('.newSingle__bar ');
const progress = document.querySelector('.bar__progress');
const title = document.querySelector('.newSingle__songName');
const cover = document.querySelector('.player__img');
const imgSrc = document.querySelector('.Play');
const time = document.querySelector('.time1');
const timeFull = document.querySelector('.time2');
const body = document.querySelector('.newSingle__body');
//Назви пісень
const songsArray = ['Let me down slowly',
                     'Summertime Sadness',
                      'Another love',
                      'Bad Habits',
                      'Don`t Call Me Angle',
                      'la di die'
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
    imgSrc.src = `images/newSingl/pause-solid.svg`;
}
//Pause
function pauseSong() {
    player.classList.remove('_play');
    audio.pause();
    imgSrc.src = `images/newSingl/play-solid.svg`;
}


function nextSong() {
    songIndex++;
    if (songIndex > songsArray.length - 1){
        songIndex = 0;
    }
    loadSong(songsArray[songIndex]);
    playSong();
}
//nextBtn.addEventListener('click', nextSong);

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songsArray.length - 1;
    }
    loadSong(songsArray[songIndex]);
    playSong();
}
//prevBtn.addEventListener('click', prevSong);

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    //console.log(duration);
    //console.log(currentTime);
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    //Minutes
    let minutes = Math.floor(audio.currentTime / 60);
    let minutesFull = Math.floor(audio.duration / 60);
    if (minutes < 10 ) {
        minutes = '0' + String(minutes);    
    }
    if (minutesFull < 10 ) {
        minutesFull = '0' + String(minutesFull);    
    }
    //Seconds
    let seconds = Math.floor(audio.currentTime % 60);
    let secondsFull = Math.floor(audio.duration % 60);
    if (seconds < 10 ) {
        seconds = '0' + String(seconds);
    }
    if (secondsFull < 10 ) {
        secondsFull = '0' + String(secondsFull);    
    }

    time.innerHTML =`${minutes}:${seconds}`;
    if(!isNaN(minutesFull) && !isNaN(secondsFull)) {
        timeFull.innerHTML =`${minutesFull}:${secondsFull}`;
    }
    


}
audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;

}
progressContainer.addEventListener('click', setProgress);

function infinity() {
    songIndex = 0;
    loadSong(songsArray[songIndex]);
    playSong();
}

//AutoPlay

audio.addEventListener('ended', nextSong);

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('_play');
    if (isPlaying) {
        pauseSong();
       
    } else {
        playSong();
    }
});