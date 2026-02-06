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
  { time: 3, text: "TRAZIM" },
  { time: 6.3, text: "PUT" },
  { time: 7.2, text: "PREMA" },
  { time: 8.7, text: "SVETU" },
  { time: 13.9, text: "TVOM" },
  { time: 15.5, text: "OSTAVI" },
  { time: 19.1, text: "TRAG" },
  { time: 20, text: "NA" },
  { time: 21.4, text: "PUTU" },
  { time: 26.7, text: "SVOM" },
  { time: 27.6, text: "KAD" },
  { time: 29.2, text: "NISI" },
  { time: 33.1, text: "TU" },
  { time: 34.1, text: "SUNCE" },
  { time: 34.2, text: "GUBI" },
  { time: 34.7, text: "SVOJ" },
  { time: 40.4, text: "SJAJ" },
  { time: 40.9, text: "BEZ" },
  { time: 42, text: "ZVJEDZA" },
  { time: 45.7, text: "NOC" },
  { time: 46.4, text: "NECE" },
  { time: 47.1, text: "IMAT" },
  { time: 47.7, text: "SVOJ" },
  { time: 50.3, text: "KRAJ" },
  { time: 56.2, text: "DA I' ZNAS KRAJ" },
  { time: 59.2, text: "DA ZNAS" }
];

function playSecretSong() {
  music.src = "ostavi.mp3";
  music.play();

  lyrics.forEach(line => {
    setTimeout(() => {

      // Reset opacity instantly (fixes disappearing lyrics)
      lyricsDiv.style.transition = "none";
      lyricsDiv.style.opacity = "0";
      void lyricsDiv.offsetWidth;
      lyricsDiv.style.transition = "opacity 0.5s ease";

      // Show new word
      lyricsDiv.textContent = line.text;
      lyricsDiv.style.opacity = "1";

      // Fade out after 1 second
      setTimeout(() => {
        lyricsDiv.style.opacity = "0";
      }, 150);

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
