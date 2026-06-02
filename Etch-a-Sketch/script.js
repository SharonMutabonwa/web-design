const container = document.querySelector("#container");
const resizeBtn = document.querySelector("#resize-btn");

function createGrid(size) {
    // Remove old squares
    container.innerHTML = "";

    // Create new squares
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        square.style.width = `calc(100% / ${size})`;
        square.style.height = `calc(100% / ${size})`;

        square.dataset.darkness = 0;

square.addEventListener("mouseenter", () => {
    // first hover → assign random color
    if (!square.dataset.color) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        square.dataset.color = `rgb(${r}, ${g}, ${b})`;
    }

    let darkness = Number(square.dataset.darkness);

    if (darkness < 10) {
        darkness++;
        square.dataset.darkness = darkness;
    }

    // apply progressive darkening
    const [r, g, b] = square.dataset.color
        .match(/\d+/g)
        .map(Number);

    const factor = 1 - (darkness * 0.1);

    square.style.backgroundColor = `rgb(
        ${Math.floor(r * factor)},
        ${Math.floor(g * factor)},
        ${Math.floor(b * factor)}
    )`;
});

        // square.addEventListener("mouseenter", () => {
    // square.classList.add("hovered");

        container.appendChild(square);
    }
}

// Initial 16x16 grid
createGrid(16);

resizeBtn.addEventListener("click", () => {
    let size = prompt("Enter number of squares per side (max 100):");

    size = Number(size);

    if (isNaN(size) || size < 1 || size > 100) {
        alert("Please enter a number between 1 and 100.");
        return;
    }

    createGrid(size);
});