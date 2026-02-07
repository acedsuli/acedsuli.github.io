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
{ time: 1.4, text: "TRAZIM" },
{ time: 4.2, text: "PUT" },
{ time: 7.6, text: "PREMA" },
{ time: 8.35, text: "SVETU" },
{ time: 10.0, text: "TVOM" },
{ time: 15.45, text: "OSTAVI" },
{ time: 17.0, text: "TRAG" },
{ time: 20.65, text: "NA" },
{ time: 21.35, text: "PUTU" },
{ time: 22.65, text: "SVOM" },
{ time: 28.1, text: "KAD" },
{ time: 28.85, text: "NISI" },
{ time: 30.3, text: "TU" },
{ time: 34.2, text: "SUNCE" },
{ time: 34.95, text: "GUBI" },
{ time: 35.8, text: "SVOJ" },
{ time: 36.2, text: "SJAJ" },
{ time: 41.95, text: "BEZ" },
{ time: 42.45, text: "ZVJEDZA" },
{ time: 43.35, text: "NOC" },
{ time: 47.15, text: "NECE" },
{ time: 47.75, text: "IMAT" },
{ time: 48.35, text: "SVOJ" },
{ time: 49.05, text: "KRAJ" },
{ time: 51.55, text: "DA I' ZNAS KRAJ" },
{ time: 57.55, text: "DA ZNAS" }


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
