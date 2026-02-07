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
  { time: 0.1, text: "DOK" },
  { time: 1.7, text: "TRAZIM" },
  { time: 4.2, text: "PUT" },
{ time: 7.3, text: "PREMA" },
{ time: 8.1, text: "SVETU" },
{ time: 9.8, text: "TVOM" },
{ time: 15.3, text: "OSTAVI" },
{ time: 16.7, text: "TRAG" },
{ time: 20.35, text: "NA" },
{ time: 21.05, text: "PUTU" },
{ time: 22.45, text: "SVOM" },
{ time: 27.75, text: "KAD" },
{ time: 28.55, text: "NISI" },
{ time: 30.1, text: "TU" },
{ time: 33.9, text: "SUNCE" },
{ time: 34.65, text: "GUBI" },
{ time: 35.5, text: "SVOJ" },
{ time: 35.9, text: "SJAJ" },
{ time: 41.7, text: "BEZ" },
{ time: 42.25, text: "ZVJEDZA" },
{ time: 43.3, text: "NOC" },
{ time: 47.15, text: "NECE" },
{ time: 47.95, text: "IMAT" },
{ time: 48.45, text: "SVOJ" },
{ time: 49.1, text: "KRAJ" },
{ time: 51.6, text: "DA I' ZNAS KRAJ" },
{ time: 57.5, text: "DA ZNAS" }

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
