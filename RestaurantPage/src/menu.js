export default function loadMenu() {
    const content = document.getElementById("content");

    const menu = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = "Menu";

    const item1 = document.createElement("p");
    item1.textContent = "🍕 Margherita Pizza";

    const item2 = document.createElement("p");
    item2.textContent = "🍝 Spaghetti Carbonara";

    const item3 = document.createElement("p");
    item3.textContent = "🥗 Caesar Salad";

    menu.append(title, item1, item2, item3);

    content.appendChild(menu);
}