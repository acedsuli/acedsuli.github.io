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
  { time: 1.3, text: "TRAZIM" },
  { time: 4.1, text: "PUT" },
{ time: 7.5, text: "PREMA" },
{ time: 8.25, text: "SVETU" },
{ time: 9.9, text: "TVOM" },
{ time: 15.35, text: "OSTAVI" },
{ time: 16.9, text: "TRAG" },
{ time: 20.55, text: "NA" },
{ time: 21.25, text: "PUTU" },
{ time: 22.55, text: "SVOM" },
{ time: 28, text: "KAD" },
{ time: 28.75, text: "NISI" },
{ time: 30.2, text: "TU" },
{ time: 34.1, text: "SUNCE" },
{ time: 34.85, text: "GUBI" },
{ time: 35.7, text: "SVOJ" },
{ time: 36.1, text: "SJAJ" },
{ time: 41.85, text: "BEZ" },
{ time: 42.35, text: "ZVJEDZA" },
{ time: 43.25, text: "NOC" },
{ time: 47.05, text: "NECE" },
{ time: 47.65, text: "IMAT" },
{ time: 48.25, text: "SVOJ" },
{ time: 48.95, text: "KRAJ" },
{ time: 51.45, text: "DA I' ZNAS KRAJ" },
{ time: 57.45, text: "DA ZNAS" }

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
