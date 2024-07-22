import {GetCard} from "./components/card/card.js";

let cards;

//more specific in var name due to no types
function ShowProgressLikeBar(cardHtmlElement) {
    let progressBar = cardHtmlElement.querySelectorAll(".progressbar-like-hover")[0];
    progressBar.style.display = "block";
}

function HideProgressLikeBar(cardHtmlElement) {
    let progressBar = cardHtmlElement.querySelectorAll(".progressbar-like-hover")[0];
    progressBar.style.display = "none";
}

function GetIframeRendered(link) {
    return `<iframe src="${link}"></iframe>`;
}

//this would be an ENUM
function ManipulateQuantity(cardHtmlElement, operation) {
    let currentParsedQuantity = parseInt(cardHtmlElement.querySelector('.quantity-modifier p').innerText);
    let quantityParagraph = cardHtmlElement.querySelector('.quantity-modifier p');

    if (operation === "add") {
        quantityParagraph.innerText = currentParsedQuantity + 1;
    }

    if (operation === "subtract") {
        if (currentParsedQuantity <= 1) {
            return;
        }

        quantityParagraph.innerText = currentParsedQuantity - 1;

    }
}

//we could've loaded /data/products.json from filesystem but we mock an api probabily
async function PopulateWithContent() {
    let container = document.getElementById("populate-with-cards");

    let products = await fetch('/data/products.json');

    if ( ! products.ok ) return;

    products = await products.json();
    products.forEach(product => {
        let card = GetCard(product.image, product.name, product.discounted_price ?? "", product.original_price, "description missing...", 1, product.link);

        container.innerHTML += card;
    });

}

document.addEventListener("DOMContentLoaded", async function () {
    await PopulateWithContent();



    cards = document.querySelectorAll(".card");


    cards.forEach((card) => {
        card.addEventListener('mouseover', () => {
            ShowProgressLikeBar(card);
        });

        card.addEventListener('mouseout', () => {
            HideProgressLikeBar(card);
        });

        card.querySelector(".btn-zoom").addEventListener('click', () => {
            window.open(card.id, '_blank');
        });

        card.querySelector('.subtractQuantity').addEventListener('click', () => {
            ManipulateQuantity(card, "subtract");
        });

        card.querySelector('.addQuantity').addEventListener('click', () => {
            ManipulateQuantity(card, "add");
        });

    });
    console.log(cards);
});