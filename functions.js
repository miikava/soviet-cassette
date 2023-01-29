var x = document.getElementById("song1");
x.volume = 0.5;


function playAudio() {
    FF.classList.remove('active');
    RW.classList.remove('active');
    clearInterval(intervalRW);
    clearInterval(intervalFF);
    x.play(); 
    } 
      
function pauseAudio() { 
    RW.classList.remove('active');
    FF.classList.remove('active');
    clearInterval(intervalRW);
    clearInterval(intervalFF);
    x.pause(); 
    } 
