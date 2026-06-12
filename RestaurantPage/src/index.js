import "./styles.css";

import loadHome from "./home";
import loadMenu from "./menu";
import loadContact from "./contact";

function clearContent() {
    const content = document.getElementById("content");
    content.textContent = "";
}

function initializeWebsite() {
    loadHome();

    document
        .getElementById("home-btn")
        .addEventListener("click", () => {
            clearContent();
            loadHome();
        });

    document
        .getElementById("menu-btn")
        .addEventListener("click", () => {
            clearContent();
            loadMenu();
        });

    document
        .getElementById("contact-btn")
        .addEventListener("click", () => {
            clearContent();
            loadContact();
        });
}

initializeWebsite();