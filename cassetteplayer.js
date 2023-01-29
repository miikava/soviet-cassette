const play_button = document.getElementById('play-btn');
const stop_button = document.getElementById('stop-btn');
const rw_button = document.getElementById('rw-btn');
const ff_button = document.getElementById('ff-btn');

var play_button_sound = new Audio('/static/noise/PLAY.mp3');
var stop_button_sound = new Audio('/static/noise/STOP.mp3');
var rw_button_sound = new Audio('/static/noise/RW.mp3');
var ff_button_sound = new Audio('/static/noise/FF.mp3');
var rw_button_noise = new Audio('/static/noise/RW_NOISE.mp3');
var ff_button_noise = new Audio('/static/noise/FF_NOISE.mp3');

rw_button_noise.loop = true;
ff_button_noise.loop = true;


play_button.addEventListener('click', () => {
    play_button_sound.currentTime = 0;
    stop_button_sound.currentTime = 0;
    play_button_sound.play();
    rw_button_noise.pause();
    ff_button_noise.pause();
});

stop_button.addEventListener('click', () => {
    stop_button_sound.currentTime = 0;
    play_button_sound.currentTime = 0;
    stop_button_sound.play();
    rw_button_noise.pause();
    ff_button_noise.pause();
});

rw_button.addEventListener('click', () => {
    if (!rw_button_noise.paused) {return}
    rw_button_sound.currentTime = 0;
    rw_button_noise.currentTime = 0;
    rw_button_sound.play();
    rw_button_noise.play();
    ff_button_noise.pause();
});

ff_button.addEventListener('click', () => {
    if (!ff_button_noise.paused) {return}
    ff_button_sound.currentTime = 0;
    ff_button_noise.currentTime = 0;
    ff_button_sound.play();
    ff_button_noise.play();
    rw_button_noise.pause();
});
