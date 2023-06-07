// Obter ID
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Requisição de detalhes usando o ID do produto
fetch(`https://diwserver.vps.webdock.cloud/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
        const productDetailsContainer = document.getElementById("productDetails");

        // Card do produto
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = product.image;
        card.appendChild(image);

        const title = document.createElement("h3");
        title.textContent = product.title;
        card.appendChild(title);

        const button = document.createElement("button");
        button.textContent = "Buy Now";
        button.classList.add("card-button");
        button.addEventListener("click", () => {
            window.location.href = `details.html?id=${product.id}`;
        });
        card.appendChild(button);

        const price = document.createElement("h4");
        price.textContent = `Price: $${product.price}`;
        card.appendChild(price);

        const description = document.createElement("p");
        description.innerHTML = product.description;
        card.appendChild(description);

        productDetailsContainer.appendChild(card);
    });
