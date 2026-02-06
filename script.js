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

/* ---------- LYRIC SYNC ---------- */
const lyrics = [
  { time: 0, text: "DOK" },
  { time: 2, text: "TRAZIM" },
  { time: 5.3, text: "PUT" },
  { time: 7.2, text: "PREMA" },
  { time: 8, text: "SVETU" },
  { time: 13.9, text: "TVOM" },
  { time: 15, text: "OSTAVI" },
  { time: 18, text: "TRAG" },
  { time: 19, text: "NA" },
  { time: 20.4, text: "PUTU" },
  { time: 25.7, text: "SVOM" },
  { time: 26.6, text: "KAD" },
  { time: 28.2, text: "NISI" },
  { time: 32.1, text: "TU" },
  { time: 33.1, text: "SUNCE" },
  { time: 33.2, text: "GUBI" },
  { time: 33.7, text: "SVOJ" },
  { time: 39.4, text: "SJAJ" },
  { time: 39.9, text: "BEZ" },
  { time: 41, text: "ZVJEDZA" },
  { time: 44.7, text: "NOC" },
  { time: 45.4, text: "NECE" },
  { time: 46.1, text: "IMAT" },
  { time: 46.7, text: "SVOJ" },
  { time: 49.3, text: "KRAJ" },
  { time: 55.2, text: "DA I/' ZNAS KRAJ" },
  { time: 58.2, text: "DA ZNAS" }
];

function playSecretSong() {
  music.src = "ostavi.mp3";
  music.currentTime = 0;
  music.play();

  // Make sure lyrics are visible
  lyricsDiv.style.opacity = "1";

  lyrics.forEach(line => {
    setTimeout(() => {
      lyricsDiv.textContent = line.text;
    }, line.time * 1000);
  });
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
