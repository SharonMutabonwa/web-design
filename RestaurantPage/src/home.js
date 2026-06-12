export default function loadHome() {
    const content = document.getElementById("content");

    const home = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = "Bella Vista Restaurant";

    const description = document.createElement("p");
    description.textContent =
        "Serving delicious food made with fresh ingredients every day.";

    home.appendChild(title);
    home.appendChild(description);

    content.appendChild(home);
}