```javascript
"use strict";

/* ========================================
   1. PASSWORD SETTINGS
======================================== */

const SECRET_PASSWORD = "003";


/* ========================================
   2. GET HTML ELEMENTS
======================================== */

const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const passwordInput = document.getElementById("password");
const unlockForm = document.getElementById("unlockForm");
const errorMessage = document.getElementById("errorMessage");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");


/* ========================================
   3. UNLOCK THE PAGE
======================================== */

unlockForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredPassword = passwordInput.value;

    if (enteredPassword === SECRET_PASSWORD) {
        lockScreen.classList.add("hidden");
        mainContent.classList.remove("hidden");

        errorMessage.textContent = "";
        passwordInput.value = "";

        startMusic();
    } else {
        errorMessage.textContent =
            "❌ Incorrect password. Please try again.";

        passwordInput.value = "";
        passwordInput.focus();
    }
});


/* ========================================
   4. PLAY BACKGROUND MUSIC
======================================== */

async function startMusic() {
    try {
        await music.play();
        musicButton.textContent = "⏸️ Pause Music";
    } catch (error) {
        musicButton.textContent = "🎵 Play Music";
    }
}


/* ========================================
   5. PLAY / PAUSE BUTTON
======================================== */

musicButton.addEventListener("click", async function () {
    if (music.paused) {
        await startMusic();
    } else {
        music.pause();
        musicButton.textContent = "🎵 Play Music";
    }
});


/* ========================================
   6. UPDATE MUSIC BUTTON STATUS
======================================== */

music.addEventListener("play", function () {
    musicButton.textContent = "⏸️ Pause Music";
});

music.addEventListener("pause", function () {
    musicButton.textContent = "🎵 Play Music";
});

music.addEventListener("error", function () {
    musicButton.textContent = "🎵 Music Unavailable";
});


/* ========================================
   7. PHOTO PLACEHOLDER
   Displays a placeholder when a photo
   cannot be found.
======================================== */

function createPlaceholder(label) {
    const safeLabel = String(label || "Photo")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="600" height="600"
             viewBox="0 0 600 600">

            <defs>
                <linearGradient id="background"
                    x1="0" y1="0" x2="1" y2="1">

                    <stop offset="0%" stop-color="#e9c9df"/>
                    <stop offset="100%" stop-color="#b5e3e8"/>

                </linearGradient>
            </defs>

            <rect width="600" height="600"
                  rx="35" fill="url(#background)"/>

            <text x="300" y="265"
                  font-size="90"
                  text-anchor="middle">📸</text>

            <text x="300" y="340"
                  font-family="Arial, sans-serif"
                  font-size="30"
                  font-weight="bold"
                  text-anchor="middle"
                  fill="#76588e">
                ${safeLabel}
            </text>

            <text x="300" y="385"
                  font-family="Arial, sans-serif"
                  font-size="20"
                  text-anchor="middle"
                  fill="#666666">
                Add your photo here
            </text>

        </svg>`;

    return "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg);
}


/* ========================================
   8. HANDLE MISSING PHOTOS
======================================== */

document
    .querySelectorAll("img[data-placeholder]")
    .forEach(function (img) {

        img.addEventListener("error", function () {

            if (img.dataset.fallbackApplied === "true") {
                return;
            }

            img.dataset.fallbackApplied = "true";

            img.src = createPlaceholder(
                img.dataset.placeholder
            );
        });

        // Check whether the image already failed to load.
        if (img.complete && img.naturalWidth === 0) {
            img.dispatchEvent(new Event("error"));
        }
    });


/* ========================================
   9. INITIAL PAGE CHECK
======================================== */

if (lockScreen && mainContent && passwordInput) {
    passwordInput.focus();
}
```
