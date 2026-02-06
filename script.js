/* ---------- MUSIC ---------- */
const button = document.getElementById("musicBtn");
const music = new Audio("star.mp3");
const starContainer = document.getElementById("starContainer");
const overlay = document.getElementById("secretBackground");
const lyricsDiv = document.getElementById("lyrics");

let playing = false;
let starTimeout;
let starsVisible = false;
let pauseCount = 0;
let secretMode = false;

/* ---------- BUTTON CLICK ---------- */
button.addEventListener("click", () => {
  if (!playing) {
    if (secretMode) {
      playSecretSong();
    } else {
      music.src = "star.mp3";
      music.currentTime = 0;
      music.play();
      button.textContent = "pause music";

      starTimeout = setTimeout(() => {
        spawnStars();
        starsVisible = true;
      }, 16000);
    }
  } else {
    music.pause();
    clearTimeout(starTimeout);
    removeStars();
    starsVisible = false;

    pauseCount++;
    if (pauseCount >= 5 && !secretMode) {
      activateSecretMode();
    }

    if (secretMode) {
      button.textContent = "SECRET MUSIC BUTTON";
      overlay.style.opacity = "0";
    } else {
      button.textContent = "press this for music";
    }
  }

  playing = !playing;
});

/* ---------- SECRET MODE ---------- */
function activateSecretMode() {
  secretMode = true;
  button.textContent = "SECRET MUSIC BUTTON";
  button.classList.add("secret");

  document.querySelectorAll("h1, p, button, .star").forEach(el => {
    el.classList.add("fade-out");
  });

  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.opacity = "0.85";
  }, 100);
}

/* ---------- LYRIC SYNC (REAL-TIME ENGINE) ---------- */
const lyrics = [
  { time: 0, text: "DOK" },
  { time: 2.9, text: "TRAZIM" },
  { time: 6, text: "PUT" },
  { time: 9.4, text: "PREMA" },
  { time: 10.2, text: "SVETU" },
  { time: 11.8, text: "TVOM" },
  { time: 17.2, text: "OSTAVI" },
  { time: 18.4, text: "TRAG" },
  { time: 22, text: "NA" },
  { time: 22.5, text: "PUTU" },
  { time: 24, text: "SVOM" },
  { time: 29.5, text: "KAD" },
  { time: 30.2, text: "NISI" },
  { time: 31.8, text: "TU" },
  { time: 35.6, text: "SUNCE" },
  { time: 36.4, text: "GUBI" },
  { time: 37.3, text: "SVOJ" },
  { time: 37.8, text: "SJAJ" },
  { time: 43.4, text: "BEZ" },
  { time: 43.9, text: "ZVJEDZA" },
  { time: 44.8, text: "NOC" },
  { time: 48, text: "NECE" },
  { time: 48.6, text: "IMAT" },
  { time: 49.1, text: "SVOJ" },
  { time: 49.7, text: "KRAJ" },
  { time: 52.2, text: "DA I/' ZNAS KRAJ" },
  { time: 58.2, text: "DA ZNAS" }
];

let currentLyricIndex = -1;

function playSecretSong() {
  music.src = "ostavi.mp3";
  music.currentTime = 0;
  music.play();

  currentLyricIndex = -1;
  lyricsDiv.textContent = "";
  lyricsDiv.style.opacity = 0;

  requestAnimationFrame(updateLyrics);
}

function updateLyrics() {
  const t = music.currentTime;

  // Find the current lyric
  for (let i = 0; i < lyrics.length; i++) {
    if (t >= lyrics[i].time && (i === lyrics.length - 1 || t < lyrics[i + 1].time)) {
      if (currentLyricIndex !== i) {
        currentLyricIndex = i;

        // Fade in
        lyricsDiv.style.transition = "opacity 0.3s ease";
        lyricsDiv.style.opacity = 1;
        lyricsDiv.textContent = lyrics[i].text;

        // Fade out before next lyric
        if (i < lyrics.length - 1) {
          const nextTime = lyrics[i + 1].time;
          const fadeOutStart = (nextTime - 0.25) * 1000;

          setTimeout(() => {
            lyricsDiv.style.transition = "opacity 0.3s ease";
            lyricsDiv.style.opacity = 0;
          }, fadeOutStart - t * 1000);
        }
      }
      break;
    }
  }

  requestAnimationFrame(updateLyrics);
}

/* ---------- STAR FUNCTIONS ---------- */
function spawnStars() {
  for (let i = 0; i < 10; i++) {
    const star = document.createElement("img");
    star.src = "star.png";
    star.className = "star floating";
    star.style.opacity = "0";
    star.style.position = "absolute";
    star.style.top = `${Math.random() * 80 + 10}%`;
    star.style.left = `${Math.random() * 80 + 10}%`;
    starContainer.appendChild(star);

    setTimeout(() => {
      star.style.transition = "opacity 2s";
      star.style.opacity = "1";
    }, 100);
  }
}

function removeStars() {
  const stars = document.querySelectorAll(".star");
  stars.forEach(star => {
    star.style.transition = "opacity 0.5s";
    star.style.opacity = "0";
    setTimeout(() => star.remove(), 500);
  });
}

/* ---------- IDLE FLOAT ---------- */
window.addEventListener("load", () => {
  const elements = document.querySelectorAll("h1, p, button");
  elements.forEach(el => el.classList.add("floating"));
});

/* ---------- WIGGLE + PRESS ---------- */
const wiggleElements = document.querySelectorAll("h1, p, button");

wiggleElements.forEach(el => {
  el.addEventListener("mouseenter", () => {
    el.classList.remove("floating");
    el.classList.add("wiggling");
  });

  el.addEventListener("mouseleave", () => {
    el.classList.remove("wiggling");
    el.classList.remove("pressed");
    el.classList.add("floating");
  });

  el.addEventListener("mousedown", () => {
    el.classList.add("pressed");
  });

  el.addEventListener("mouseup", () => {
    el.classList.remove("pressed");
  });
});
