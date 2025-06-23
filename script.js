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

document.querySelectorAll(".music-card").forEach(card => {
    const song = card.querySelector(".song");
    const progress = card.querySelector(".progress");
    const ctrlIcon = card.querySelector(".ctrlIcon");
    let progressUpdater;

    song.pause();
    song.currentTime = 0;

    song.onloadedmetadata = () => {
        progress.max = song.duration;
        progress.value = song.currentTime;
    };

    ctrlIcon.parentElement.addEventListener('click', () => {
        if (song.paused) {

            document.querySelectorAll(".song").forEach(otherSong => {
            if (otherSong !== song) {
                otherSong.pause();
                otherSong.closest('.music-card')
                    .querySelector('.ctrlIcon')
                    .classList.remove("fa-pause");
                otherSong.closest('.music-card')
                    .querySelector('.ctrlIcon')
                    .classList.add("fa-play");
            }
        });
            song.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");

            progressUpdater = setInterval(() => {
                progress.value = song.currentTime;
            }, 100);
        } else {
            song.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");

            clearInterval(progressUpdater);
        }
    });

    progress.addEventListener('input', () => {
        song.currentTime = progress.value;
        if (song.paused) {
            song.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");

            progressUpdater = setInterval(() => {
                progress.value = song.currentTime;
            }, 100);
        }
    });

    song.addEventListener("ended", () => {
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        progress.value = song.currentTime;
    });
});


/* Original play pause functions
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
};*/