let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById("theme-switch");

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
}

if (darkmode === 'active') {
    enableDarkmode();
}

themeSwitch.addEventListener('click', () => {
        darkmode = localStorage.getItem('darkmode');

        if (darkmode !== 'active') {
            enableDarkmode();
        } else {
            disableDarkmode();
        }
})

const progress = document.getElementById("progress");
const song = document.getElementById("song");
const ctrlIcon = document.getElementById("ctrlIcon");

song.pause();
song.currentTime = 0;

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

let progressUpdater;

function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");

        progressUpdater = setInterval(() => {
            progress.value = song.currentTime;
        }, 500);
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");

        clearInterval(progressUpdater);
    }
}

progress.onchange = function () {
    song.currentTime = progress.value;
    if (song.paused) {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");

        progressUpdater = setInterval(() => {
            progress.value = song.currentTime;
        }, 500);
    }
};