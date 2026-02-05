/* ---------- MUSIC ---------- */
const button = document.getElementById("musicBtn");
const music = new Audio("star.mp3");
const starContainer = document.getElementById("starContainer");
const overlay = document.getElementById("secretBackground"); 
const lyricsDiv = document.getElementById("lyrics"); // lyric container

let playing = false;
let starTimeout;
let starsVisible = false;
let pauseCount = 0;
let secretMode = false;

/* ---------- BUTTON CLICK ---------- */
button.addEventListener("click", () => {
  if (!playing) {
    // Play music
    if (secretMode) {
      playSecretSong(); // play secret track + lyrics
    } else {
      music.src = "star.mp3";
      music.play();
      button.textContent = "pause music";

      // Delay star spawn by 16s
      starTimeout = setTimeout(() => {
        spawnStars();
        starsVisible = true;
      }, 16000);
    }
  } else {
    // Pause music
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
      overlay.style.opacity = "0"; // fade out background
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

  // Fade out all normal text quickly
  document.querySelectorAll("h1, p, button, .star").forEach(el => {
    el.classList.add("fade-out");
  });

  // Black background stays, overlay fades in
  overlay.style.opacity = "0";
  setTimeout(() => {
    overlay.style.opacity = "0.85";
  }, 100);
}

/* ---------- LYRIC SYNC ---------- */
const lyrics = [
  { time: 0, text: "DOK" },
  { time: 2, text: "TRAZIM" },
  { time: 4, text: "PUT" },
  { time: 6, text: "PREMA" },
  { time: 7, text: "SVETU" },
  { time: 8, text: "TVOM" },
  { time: 3, text: "OSTAVI" },
  { time: 6, text: "TRAG" },
  { time: 1, text: "NA" },
  { time: 3, text: "PUTU" },
  { time: 8, text: "SVOM" },
  { time: 1, text: "KAD" },
  { time: 3, text: "NISI" },
  { time: 6, text: "TU" },
  { time: 1, text: "SUNCE" },
  { time: 1, text: "GUBI" },
  { time: 1, text: "SVOJ" },
  { time: 9, text: "SJAJ" },
  { time: 1, text: "BEZ" },
  { time: 2, text: "ZVJEDZA" },
  { time: 6, text: "NOC" },
  { time: 1, text: "NECE" },
  { time: 1, text: "IMAT" },
  { time: 1, text: "SVOJ" },
  { time: 4, text: "KRAJ" },
  { time: 9, text: "DA I' ZNAS KRAJ" },
  { time: 6, text: "DA ZNAS" }
];

function playSecretSong() {
  music.src = "ostavi.mp3"; // your intro audio file
  music.play();

  lyrics.forEach(line => {
    setTimeout(() => {
      lyricsDiv.textContent = line.text;
      lyricsDiv.style.opacity = "1";

      // fade out after 1s
      setTimeout(() => {
        lyricsDiv.style.opacity = "0";
      }, 1000);
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
