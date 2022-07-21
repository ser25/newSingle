const player1 = document.querySelector('.newSingle__body');
const player2 = document.querySelector('.LastTracke__body');
const playBtn = document.querySelectorAll('.playPause__item_play');
const audio1 = document.querySelector('.newSingle__song');
//const audio = document.querySelector('.newSingle__song');
const audio2 = document.querySelector('.LastTracke__song');
const progressContainerNewSingle = document.querySelector('.newSingle__bar ');
const progressContainerLastTracke = document.querySelector('.LastTracke__bar ');
const progressNewSingle = document.querySelector('.bar__progress_newSingle');
const progressLastTracke = document.querySelector('.bar__progress_LastTracke');
const title = document.querySelector('.newSingle__songName');
let cover = document.querySelector('[data-image]');
const imgSrcs = document.querySelectorAll('.Play');
const times = document.querySelectorAll('.time1');
const timesFull = document.querySelectorAll('.time2');
const nextBtn = document.querySelector('.playPause__item_2');
const prevBtn = document.querySelector('.playPause__item_1');
//Назви пісень
const songsArray = ['Let me down slowly',
                     'Summertime Sadness',
                      'Another love',
                      'Bad Habits',
                      'Don’t Call Me Angel',
                      'la di die'
                    ];
const songsArray1 = ['Let me down slowly',
                   ];                 

function offPlayer1OnPlayer2(){
    let a = player1.classList.contains('_is');
    let b = player1.classList.contains('_play');
    if (a && b) {
        pauseSong();
    } else{
        playSong()
    }
}
function offPlayer2OnPlayer1(){
    let a = player2.classList.contains('_is');
    let b = player2.classList.contains('_play');
    if (a && b) {
        pauseSong();
    }
}

//Пісня по умолчанію
let songIndexSingle = songsArray.length - 1;
let songIndex = 0;
//Init
function loadSong(song, audio = audio1) {
    if(audio === audio1){
        title.innerHTML = song;
    }
    audio.src = `music/${song}.mp3`;
    cover.src = `images/lastTracks/songs/${songIndex + 1}.webp`;
}

loadSong(songsArray[songIndexSingle]);
//Play
function playSong() {
    let necessaryPlayer1 = player1.classList.contains('_is');
    let necessaryPlayer2 = player2.classList.contains('_is');
    let imgPlay = player1.querySelector('._img') || player2.querySelector('._img');
    if (necessaryPlayer1) {
        player1.classList.add('_play');
        audio1.play();
        imgPlay.src = `images/newSingl/pause-solid.svg`;
    } else if(necessaryPlayer2){
        player2.classList.add('_play');
        audio2.play();
        imgPlay.src = `images/newSingl/pause-solid.svg`;
    }

}
//Pause
function pauseSong() {
    let necessaryPlayer1 = player1.classList.contains('_is');
    let necessaryPlayer2 = player2.classList.contains('_is');
    let imgPlay = player1.querySelector('._img') || player2.querySelector('._img');
    if (necessaryPlayer1) {
        player1.classList.remove('_play');
        player1.classList.remove('_is');

        imgPlay.src = `images/newSingl/play-solid.svg`;
        imgPlay.classList.remove('_img');
        audio1.pause();
    } else if(necessaryPlayer2){
        player2.classList.remove('_play');
        player2.classList.remove('_is');

        imgPlay.src = `images/newSingl/play-solid.svg`;
        imgPlay.classList.remove('_img');
        audio2.pause();
    }
}
//Start
playBtn.forEach(function(item){
    item.addEventListener('click', function()  {
      
        let isPlayer = item.closest('.newSingle__body') || item.closest('.LastTracke__body');
        let isPlaying = isPlayer.classList.contains('_play');
        offPlayer2OnPlayer1();
        let necessaryBtn = isPlayer.classList.add('_is');
        let isBtn = item.querySelector('.Play');
        isBtn = isBtn.classList.add('_img');

        if (isPlaying) {
            pauseSong();
        } else {
            offPlayer1OnPlayer2();
            playSong();
        }
    });
});


function nextSong() {
    songIndex++;
    if (songIndex > songsArray.length - 2){
        songIndex = 0;
    }
    loadSong(songsArray[songIndex], audio2);
    offPlayer1OnPlayer2();
    let addPlayer2 = player2.classList.add('_is');
    let addImg = player2.querySelector('.Play')
    addImg = addImg.classList.add('_img');
    playSong();

}
nextBtn.addEventListener('click', nextSong);

function prevSong() {
    songIndex--;
    if (songIndex < 0){
        songIndex = songsArray.length - 2;
    }
    loadSong(songsArray[songIndex], audio2);
    offPlayer1OnPlayer2();
    let addPlayer2 = player2.classList.add('_is');
    let addImg = player2.querySelector('.Play')
    addImg = addImg.classList.add('_img');
    playSong();

}
prevBtn.addEventListener('click', prevSong);

function updateProgress(e, progress, time) {
    const {duration, currentTime} = e.srcElement;
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
updateProgress(progressContainerNewSingle, progressNewSingle);
audio1.addEventListener('timeupdate', updateProgress);
audio2.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio1.duration;

    audio1.currentTime = (clickX / width) * duration;

}
progressContainer.addEventListener('click', setProgress);

function infinity() {
    songIndex = songsArray.length -1;
    loadSong(songsArray[songIndex]);
    playSong();
}

//AutoPlay

audio1.addEventListener('ended', infinity);
audio2.addEventListener('ended', nextSong);


    