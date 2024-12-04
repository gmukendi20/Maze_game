// Maze canvas and context
const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const tileSize = 40;
const player = { x: 0, y: 0 };
const goal = { x: 360, y: 360 };
const walls = [
    { x: 80, y: 0 }, { x: 80, y: 40 }, { x: 80, y: 80 },
    { x: 120, y: 80 }, { x: 160, y: 80 }, { x: 200, y: 80 },
    { x: 200, y: 120 }, { x: 200, y: 160 }, { x: 160, y: 160 },
    { x: 120, y: 160 }, { x: 120, y: 200 }, { x: 120, y: 240 },
    { x: 160, y: 240 }, { x: 200, y: 240 }, { x: 200, y: 280 },
    { x: 200, y: 320 }, { x: 240, y: 320 }, { x: 280, y: 320 },
    { x: 320, y: 320 }, { x: 320, y: 280 }, { x: 320, y: 240 },
    { x: 320, y: 200 }, { x: 320, y: 160 }, { x: 320, y: 120 },
    { x: 320, y: 80 }, { x: 280, y: 80 }, { x: 240, y: 80 },
];

// Draw the maze
function drawMaze() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw walls
    ctx.fillStyle = "black";
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, tileSize, tileSize);
    });

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, tileSize, tileSize);

    // Draw goal
    ctx.fillStyle = "red";
    ctx.fillRect(goal.x, goal.y, tileSize, tileSize);
}

// Check for collision with walls
function isCollision(x, y) {
    return walls.some(wall => wall.x === x && wall.y === y);
}

// Move the player
function movePlayer(event) {
    const { x, y } = player;
    let newX = x;
    let newY = y;

    if (event.key === "ArrowUp") newY -= tileSize;
    if (event.key === "ArrowDown") newY += tileSize;
    if (event.key === "ArrowLeft") newX -= tileSize;
    if (event.key === "ArrowRight") newX += tileSize;

    // Check for boundaries and collisions
    if (
        newX >= 0 &&
        newX < canvas.width &&
        newY >= 0 &&
        newY < canvas.height &&
        !isCollision(newX, newY)
    ) {
        player.x = newX;
        player.y = newY;

        // Check for win
        if (player.x === goal.x && player.y === goal.y) {
            setTimeout(() => {
                alert("You win!");
                resetGame();
            }, 100);
        }
    }

    drawMaze();
}

// Reset the game
function resetGame() {
    player.x = 0;
    player.y = 0;
    drawMaze();
}

// Initialize the game
drawMaze();
document.addEventListener("keydown", movePlayer);
