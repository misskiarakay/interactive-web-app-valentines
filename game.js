document.addEventListener("DOMContentLoaded", () => {
    const backgroundMusic = new Audio("snake.mp3");
    backgroundMusic.loop = true;

    function startMusic() {
        const savedTime = localStorage.getItem("snakeMusicTime");
        if (savedTime) {
            backgroundMusic.currentTime = parseFloat(savedTime);
        }
        backgroundMusic.play().catch(error => console.log("Autoplay blocked:", error));
    }

    document.addEventListener("click", startMusic);

    function saveMusicTime() {
        localStorage.setItem("snakeMusicTime", backgroundMusic.currentTime);
    }

    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 400;

    let snake = [{ x: 200, y: 200 }];
    let direction = { x: 20, y: 0 };
    let heart = generateHeart();
    let score = 0;
    let gameRunning = true;
    let gameInterval = null;

    const eatSound = new Audio("retro-coin.wav");

    function generateHeart() {
        return {
            x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
            y: Math.floor(Math.random() * (canvas.height / 20)) * 20
        };
    }

    function drawSnake() {
        ctx.fillStyle = "#00ff00";
        snake.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, 20, 20);
        });
    }

    function drawHeart() {
        ctx.fillStyle = "red";
        const x = heart.x + 10;
        const y = heart.y + 10;

        ctx.beginPath();
        ctx.moveTo(x, y + 5);
        ctx.arc(x - 5, y - 5, 5, 0, Math.PI * 2);
        ctx.arc(x + 5, y - 5, 5, 0, Math.PI * 2);
        ctx.lineTo(x + 5, y + 2);
        ctx.lineTo(x, y + 10);
        ctx.lineTo(x - 5, y + 2);
        ctx.closePath();
        ctx.fill();
    }

    function moveSnake() {
        if (!gameRunning) return;

        let newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
            endGame();
            return;
        }

        for (let i = 1; i < snake.length; i++) {
            if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
                endGame();
                return;
            }
        }

        snake.unshift(newHead);

        if (newHead.x === heart.x && newHead.y === heart.y) {
            score++;
            eatSound.play();
            if (score === 5) {
                showWinMessage();
                return;
            }
            heart = generateHeart();
        } else {
            snake.pop();
        }
    }

    function showWinMessage() {
        gameRunning = false;
        clearInterval(gameInterval);
        saveMusicTime();

        setTimeout(() => {
            alert("congrats!!! what you did was actually win my heart -->.");
            alert("notice there's a piece missing, it's you who filled it. 💕");
            alert("i love yoooouuu ᡣ˶ᵔ ᵕ ᵔ˶𐭩 ♡");
            window.location.href = "index.html";
        }, 100);
    }

    function endGame() {
        gameRunning = false;
        clearInterval(gameInterval);
        setTimeout(() => {
            alert("oops! you lost! try again use arrow keys btw!.");
            resetGame();
        }, 100);
    }

    function resetGame() {
        snake = [{ x: 200, y: 200 }];
        direction = { x: 20, y: 0 };
        heart = generateHeart();
        score = 0;
        gameRunning = true;
        startGameLoop();
    }

    function gameLoop() {
        if (!gameRunning) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawSnake();
        drawHeart();
        moveSnake();
    }

    function startGameLoop() {
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 150);
    }

    document.addEventListener("keydown", (e) => {
        if (!gameRunning) return;

        if (e.key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -20 };
        if (e.key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: 20 };
        if (e.key === "ArrowLeft" && direction.x === 0) direction = { x: -20, y: 0 };
        if (e.key === "ArrowRight" && direction.x === 0) direction = { x: 20, y: 0 };
    });

    startGameLoop();
});















