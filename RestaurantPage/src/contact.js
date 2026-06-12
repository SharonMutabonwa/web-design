export default function loadContact() {
    const content = document.getElementById("content");

    const contact = document.createElement("div");

    const title = document.createElement("h1");
    title.textContent = "Contact Us";

    const phone = document.createElement("p");
    phone.textContent = "Phone: +1 555-123-4567";

    const address = document.createElement("p");
    address.textContent = "123 Main Street";

    contact.append(title, phone, address);

    content.appendChild(contact);
}