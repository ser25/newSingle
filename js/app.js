const player1 = document.querySelector('.newSingle__body');
const player2 = document.querySelector('.LastTracke__body');
const playBtn = document.querySelectorAll('.playPause__item_play');
const audio1 = document.querySelector('.newSingle__song');
const audio = document.querySelector('.newSingle__song');
const audio2 = document.querySelector('.LastTracke__song');
const progressContainer = document.querySelector('.newSingle__bar ');
const progress = document.querySelectorAll('.bar__progress');
const title = document.querySelector('.newSingle__songName');
const cover = document.querySelector('.player__img');
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

 function necessaryData(){

    let isPlayer = item.closest('.plays');
    isPlayer = isPlayer.closest('.LastTracke__body') || isPlayer.closest('.newSingle__body');
    if(isPlayer === player1 ){
        // player1
        let audio = audio1;
        console.log(audio);
        //playSong(item, audio);
        return audio

    } else if (isPlayer === player2) {
        // player2
        let audio = audio2;
        return audio
    }
    

}

//Пісня по умолчанію
let songIndex = 0;
//Init
function loadSong(song, audio = audio1) {
    if(audio === audio1){
        title.innerHTML = song;
    }
    audio.src = `music/${song}.mp3`;
}  
loadSong(songsArray[songIndex]);
//Play
function playSong() {
    /*audio.play();
    if (!(item === undefined)) {
        let imageScr = item.querySelector('.Play');
        imageScr.src = `images/newSingl/pause-solid.svg`; 
    };*/
    let necessaryPlayer1 = player1.classList.contains('_is');
    let necessaryPlayer2 = player2.classList.contains('_is');
    if (necessaryPlayer1) {
        player1.classList.add('_play');
        audio1.play();
    } else if(necessaryPlayer2){
        player2.classList.add('_play');
        audio2.play();
    }

}
//Pause
function pauseSong() {
   /* //item.classList.remove('._play');
    audio.pause();
    if (!(item === undefined)) {
        let imageScr = item.querySelector('.Play');
        imageScr.src = `images/newSingl/play-solid.svg`;
    }*/
    let necessaryPlayer1 = player1.classList.contains('_is');
    let necessaryPlayer2 = player2.classList.contains('_is');
    if (necessaryPlayer1) {
        player1.classList.remove('_play');
        player1.classList.remove('_is');
        audio1.pause();
    } else if(necessaryPlayer2){
        player2.classList.remove('_play');
        player2.classList.remove('_is');
        audio2.pause();
    }
}
//Start
playBtn.forEach(function(item){
    item.addEventListener('click', () => {
       /* let necessaryBtn = item.classList.toggle('_is'); 
        if (necessaryBtn) {
            playSong(item);
        } else {
            pauseSong(item);
        }*/
        let isPlayer = item.closest('.LastTracke__body') || item.closest('.newSingle__body');
        //isPlayer = isPlayer.closest('.LastTracke__body') || isPlayer.closest('.newSingle__body');
        let isPlaying = isPlayer.classList.contains('_play');
        let necessaryBtn = isPlayer.classList.add('_is');
        console.log(isPlayer);
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });
});


function nextSong() {
    /*songIndex++;
    if (songIndex > songsArray.length - 1){
        songIndex = 0;
    }
    loadSong(songsArray[songIndex]);
    let weq = player2.querySelector('.Play')
    console.log(weq);
    audio2.play
    weq.src = `images/newSingl/pause-solid.svg`;
    let qws = player2.querySelector('.plays')
    //let qwws = qws.classList.add('_is')*/

    songIndex++;
    if (songIndex > songsArray.length - 1){
        songIndex = 0;
    }
    loadSong(songsArray[songIndex], audio2);
    let addPlayer2 = player2.classList.add('_is');
    playSong();

}
nextBtn.addEventListener('click', nextSong);

function prevSong() {
    /*songIndex--;
    if (songIndex < 0) {
        
    }
    loadSong(songsArray[songIndex]);
    let weq = player2.querySelector('.Play')
    console.log(weq);
    audio2.play();
    weq.src = `images/newSingl/pause-solid.svg`;
    let qws = player2.querySelector('.plays')
    //let qwws = qws.classList.add('_is')*/
    songIndex--;
    if (songIndex < 0){
        songIndex = songsArray.length - 1;
    }
    loadSong(songsArray[songIndex], audio2);
    let addPlayer2 = player2.classList.add('_is');
    playSong();

}
prevBtn.addEventListener('click', prevSong);

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressAll.forEach(progress =>{
        progress.style.width = `${progressPercent}%`;
    });
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
    times.forEach(time =>{
        time.innerHTML =`${minutes}:${seconds}`;
    })
    timesFull.forEach(timeFull => {
        if(!isNaN(minutesFull) && !isNaN(secondsFull)) {
            timeFull.innerHTML =`${minutesFull}:${secondsFull}`;
        }
    })

}
audio1.addEventListener('timeupdate', updateProgress);
audio2.addEventListener('timeupdate', updateProgress);

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

audio1.addEventListener('ended', infinity);
audio.addEventListener('ended', nextSong);


    