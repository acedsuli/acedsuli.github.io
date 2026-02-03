/* ---------- MUSIC ---------- */
const button = document.getElementById("musicBtn");
const music = new Audio("star.mp3");
const starContainer = document.getElementById("starContainer");

let playing = false;
let starTimeout;
let starsVisible = false;
let pauseCount = 0; // track pause/unpause cycles
let secretMode = false;

button.addEventListener("click", () => {
  if (!playing) {
    // Play music
    if (secretMode) {
      music.src = "ostavi.mp3"; // switch to secret track
    }
    music.play();
    button.textContent = secretMode ? "pause secret music" : "pause music";

    // Delay star spawn by 16s (only in normal mode)
    if (!secretMode) {
      starTimeout = setTimeout(() => {
        spawnStars();
        starsVisible = true;
      }, 16000);
    }
  } else {
    // Pause music
    music.pause();
    button.textContent = secretMode ? "SECRET MUSIC BUTTON" : "press this for music";

    clearTimeout(starTimeout);
    removeStars();
    starsVisible = false;

    // Count pause/unpause cycles
    pauseCount++;
    if (pauseCount >= 5 && !secretMode) {
      activateSecretMode();
    }

    // Show "pretty cool, right?" in secret mode
    if (secretMode) {
      showSecretMessage();
    }
  }
  playing = !playing;
});

function activateSecretMode() {
  secretMode = true;
  button.textContent = "SECRET MUSIC BUTTON";
  button.style.background = "darkblue";
  button.style.color = "white";

  // Fade in gif background
  document.body.style.backgroundImage = "url('fountain.gif')"; // replace with actual gif filename
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
  document.body.style.transition = "background 3s ease";
  document.body.style.opacity = "0.85"; // slight transparency
}

function showSecretMessage() {
  const msg = document.createElement("p");
  msg.textContent = "pretty cool, right?";
  msg.style.position = "absolute";
  msg.style.bottom = "20px";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.color = "white";
  msg.style.opacity = "0";
  msg.style.transition = "opacity 3s ease";
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 3000);
  }, 4000);
}

/* ---------- STAR FUNCTIONS ---------- */
function spawnStars() {
  for (let i = 0; i < 10; i++) {
    const star = document.createElement("img");
    star.src = "star.png"; // replace with your actual star image
    star.className = "star floating";
    star.style.opacity = "0";
    star.style.position = "absolute";
    star.style.top = `${Math.random() * 80 + 10}%`;
    star.style.left = `${Math.random() * 80 + 10}%`;
    starContainer.appendChild(star);

    // Fade in
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
