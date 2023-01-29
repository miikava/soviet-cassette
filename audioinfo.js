const audio = document.querySelector('audio');
const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
const seekSlider = document.getElementById('seek-slider');
const volumeSlider = document.getElementById('volume-slider');
const outputContainer = document.getElementById('volume-output');
const filenameContainer = document.getElementById('filename-output');
let raf = null;

const buttons = document.getElementById('buttons')

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () => {
  durationContainer.textContent = calculateTime(audio.duration);
}

const setSliderMax = () => {
  seekSlider.max = Math.floor(audio.duration);
}

if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
} else {
    audio.addEventListener('loadedmetadata', () => {
        displayDuration();
        setSliderMax();
  });
}

seekSlider.addEventListener('input', () => {
  currentTimeContainer.textContent = calculateTime(seekSlider.value);
  if(!audio.paused) {
    cancelAnimationFrame(raf);
  }
});


seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
    if(!audio.paused) {
        requestAnimationFrame(whilePlaying);
      }
  });


audio.addEventListener('timeupdate', () => {
    seekSlider.value = Math.floor(audio.currentTime);
});

audio.addEventListener('timeupdate', () => {
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
});


const whilePlaying = () => {
    seekSlider.value = Math.floor(audio.currentTime);
    currentTimeContainer.textContent = calculateTime(seekSlider.value);
    tracknameContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
    raf = requestAnimationFrame(whilePlaying);
  }


volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
  
    outputContainer.textContent = value;
    audio.volume = value / 100;
    console.log(audio.volume);
    console.log(e);
  });
/*
let volume = document.getElementById('volume-slider');
volume.addEventListener("change", function(e) {
    audio.volume = e.currentTarget.value / 100;
    outputContainer.textContent = audio.volume;
}) */

// filename

filenameContainer.textContent = audio.src.replace(/^.*[\\\/]/, '');


// seeking

const RW = document.getElementById('rw-btn');
const FF = document.getElementById('ff-btn');

RW.addEventListener('click', audioBackward);
FF.addEventListener('click', audioForward);

let intervalFF;
let intervalRW;

function audioBackward() {
    if (RW.classList.contains('active')) {return}
    clearInterval(intervalFF);
    FF.classList.remove('active');
    RW.classList.add('active');
    audio.pause();
    intervalRW = setInterval(windBackward, 200);
}

function audioForward() {
  if (FF.classList.contains('active')) {return}
    clearInterval(intervalRW);
    RW.classList.remove('active');
    FF.classList.add('active');
    audio.pause();
    intervalFF = setInterval(windForward, 200);
}

function windBackward() {

  if (audio.currentTime <= 1) {
    audio.currentTime = 0;
    stop_button_sound.currentTime = 0;
    stop_button_sound.play();
    rw_button_noise.pause();
    RW.classList.remove('active');
    clearInterval(intervalRW);
    pauseAudio();
    var ele = document.getElementsByName("playback");
    for(var i=0;i<ele.length;i++)
      ele[i].checked = false;
    return
  } else {
    audio.currentTime -= 1;
  }
}

function windForward() {
  
  if (audio.currentTime >= audio.duration -1) {
    audio.currentTime = audio.duration;
    stop_button_sound.currentTime = 0;
    stop_button_sound.play();
    ff_button_noise.pause();
    FF.classList.remove('active');
    clearInterval(intervalFF);
    pauseAudio();
    var ele = document.getElementsByName("playback");
    for(var i=0;i<ele.length;i++)
      ele[i].checked = false;
    return
  } else {
    audio.currentTime += 2;
  }
}
