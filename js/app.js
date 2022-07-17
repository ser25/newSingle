const player1 = document.querySelector('.newSingle__body');
const player2 = document.querySelector('.LastTracke__body');
const playBtn = document.querySelectorAll('.plays');
const audio1 = document.querySelector('.newSingle__song');
const audio = document.querySelector('.newSingle__song');
const audio2 = document.querySelector('.LastTracke__song');
const progressContainer = document.querySelector('.newSingle__bar ');
const progressAll = document.querySelectorAll('.bar__progress');
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
                    const songsArrayNewSingl = ['Let me down slowly',
                   ];                  
//Пісня по умолчанію
let songIndex = 0;
//init 
console.log(audio)
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
}  
loadSong(songsArrayNewSingl[songIndex]);
loadSong(songsArray[songIndex]);
//Play
function playSong(item) {
    console.log(`item: ${item}`);
    /*let isPlayer1 = item.closest('.newSingle__body');
    let isPlayer2 = item.closest('.LastTracke__body');
    console.log(`1: ${isPlayer1}`);
    console.log(`2: ${isPlayer2}`);*/

           // item.classList.add('._play');
            audio.play();
            /*imgSrcs.forEach(item => {
                item.src = `/images/newSingl/pause-solid.svg`;
            });*/
            //imgSrcs.src = `/images/newSingl/pause-solid.svg`;
            if (!(item === undefined)) {
                let imageScr = item.querySelector('.Play');
                imageScr.src = `/images/newSingl/pause-solid.svg`; 
            };
    /*playBtn.forEach(play => {

    })      
    player.classList.add('_play');
    audio.play();    */    

}
//Pause
function pauseSong(item) {
    //item.classList.remove('._play');
    audio.pause();
    if (!(item === undefined)) {
        let imageScr = item.querySelector('.Play');
        imageScr.src = `/images/newSingl/play-solid.svg`;
    }
}
playBtn.forEach(function(item){
    item.addEventListener('click', () => {
        /*let isPlayer1 = item.closest('.newSingle__body');
        let isPlayer2 = item.closest('.LastTracke__body');
        if(isPlayer1) {
            const isPlaying = isPlayer1.classList.add('_play1');
            console.log(`1: ${isPlaying}`);
            
        } else if(isPlayer2) {
            const isPlaying = isPlayer2.classList.add('_play2');
            console.log(`2: ${isPlaying}`);
        }*/
        let necessaryBtn = item.classList.toggle('_is'); // цвідци прац
        //let ne = item;
        if (necessaryBtn) {
            //pauseSong();
            playSong(item);
        } else {
           // playSong();
            pauseSong(item);
        }
    });
});


function nextSong() {
    songIndex++;
    if (songIndex > songsArray.length - 1){
        songIndex = 0;
    }
    loadSong(songsArray[songIndex]);
    let weq = player2.querySelector('.Play')
    console.log(weq);
    audio.play();
    weq.src = `/images/newSingl/pause-solid.svg`;
    let qws = player2.querySelector('.plays')
    let qwws = qws.classList.add('_is')

}
nextBtn.addEventListener('click', nextSong);

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songsArray.length - 1;
    }
    loadSong(songsArray[songIndex]);
    let weq = player2.querySelector('.Play')
    console.log(weq);
    audio.play();
    weq.src = `/images/newSingl/pause-solid.svg`;
    let qws = player2.querySelector('.plays')
    let qwws = qws.classList.add('_is')
}
prevBtn.addEventListener('click', prevSong);

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    //console.log(duration);
    //console.log(currentTime);
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

audio1.addEventListener('ended', infinity);
audio2.addEventListener('ended', nextSong);

/*playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('_play');
    if (isPlaying) {
        pauseSong();
       
    } else {
        playSong();
    }
});*/
//Запуск через кнопку
/*playBtn.forEach(function(item){
    item.addEventListener('click', () => {
        let isPlayings = player;
        isPlayings.forEach( item => {
            let isPlaying = item.classList.contains('_play');
            console.log(item);
            if (isPlaying) {
                pauseSong(item);
               
            } else {
                playSong(item);
            }
        })
        
    });
});*/

    