document.getElementById("continueButton").addEventListener("click", function() {
    window.location.href = "game.html";
});

document.addEventListener("DOMContentLoaded", function() {
    const music = document.getElementById("backgroundMusic");
    const noButton = document.getElementById("noButton");
    const yesButton = document.getElementById("yesButton");
    const letterPopup = document.getElementById("letterPopup");

    // Ensure music plays after user interaction
    function playMusic() {
        if (music.paused) {
            music.play().catch(error => console.log("Autoplay blocked:", error));
        }
        document.removeEventListener("click", playMusic);
    }
    document.addEventListener("click", playMusic);

    // Floating animation variables
    let isMoving = false;

    // Make the "No" button float away when the cursor gets close
    document.addEventListener("mousemove", function(event) {
        if (isMoving) return;

        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const buttonRect = noButton.getBoundingClientRect();

        // Calculate distance from mouse to button center
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        const distance = Math.sqrt((mouseX - buttonCenterX) ** 2 + (mouseY - buttonCenterY) ** 2);

        // If mouse is too close, move the button
        const moveThreshold = 120; // Distance in pixels before it moves
        if (distance < moveThreshold) {
            isMoving = true;

            let offsetX = (Math.random() * 200 - 100); // Move within a -100 to +100 px range
            let offsetY = (Math.random() * 200 - 100);

            // Keep the button inside screen boundaries
            let newX = buttonRect.left + offsetX;
            let newY = buttonRect.top + offsetY;
            newX = Math.max(10, Math.min(window.innerWidth - buttonRect.width - 10, newX));
            newY = Math.max(10, Math.min(window.innerHeight - buttonRect.height - 10, newY));

            // Apply smooth transition
            noButton.style.transition = "transform 0.4s ease-in-out";
            noButton.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

            setTimeout(() => {
                isMoving = false;
                noButton.style.transition = ""; // Reset transition
            }, 400);
        }
    });

    // Show letter when "Yes" is clicked
    yesButton.addEventListener("click", function() {
        letterPopup.classList.remove("hidden");
    });
});

