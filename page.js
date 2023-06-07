fetch("https://diwserver.vps.webdock.cloud/products")
  .then((res) => res.json())
  .then((json) => {
    const productContainer = document.getElementById("productContainer");
    const priceFilter = document.getElementById("priceFilter");
    const categoryFilter = document.getElementById("categoryFilter");
    const searchInput = document.getElementById("searchInput");

    // Função para filtrar os produtos
    const filterProducts = (priceRange, category, searchTerm) => {
      productContainer.innerHTML = ""; // Limpar os produtos exibidos

      // Filtrar os produtos com base na faixa de preço, categoria e termo de pesquisa
      const filteredProducts = json.products.filter((product) => {
        const title = product.title.toLowerCase();
        const price = product.price;
        const productCategory = product.category;
        const search = searchTerm.toLowerCase();

        // Verificar se o produto está dentro da faixa de preço selecionada
        if (priceRange !== "") {
          const [min, max] = priceRange.split("-");
          if (price < parseInt(min) || price > parseInt(max)) {
            return false;
          }
        }

        // Verificar se o produto pertence à categoria selecionada
        if (category !== "" && productCategory !== category) {
          return false;
        }

        return title.includes(search);
      });

      // Exibir os produtos filtrados
      filteredProducts.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const image = document.createElement("img");
        image.src = product.image;
        card.appendChild(image);

        const title = document.createElement("h1");
        title.textContent = product.title;
        card.appendChild(title);

        const category = document.createElement("h2");
        category.textContent = product.category;
        card.appendChild(category);

        const price = document.createElement("h4");
        price.textContent = `Price: $${product.price}`;
        card.appendChild(price);

        const rating = document.createElement("p");
        rating.innerHTML = `Rating: ${product.rating.rate} (${product.rating.count} votes) <i class="fas fa-star"></i>`;
        card.appendChild(rating);

        const button = document.createElement("button");
        button.textContent = "More Details";
        button.classList.add("card-button");
        button.addEventListener("click", () => {
          window.location.href = `details.html?id=${product.id}`;
        });
        card.appendChild(button);

        productContainer.appendChild(card);
      });
    };

    // Event listener para o filtro de preço
    priceFilter.addEventListener("change", () => {
      const selectedPriceRange = priceFilter.value;
      const selectedCategory = categoryFilter.value;
      const searchTerm = searchInput.value;
      filterProducts(selectedPriceRange, selectedCategory, searchTerm);
    });

    // Event listener para o filtro de categoria
    categoryFilter.addEventListener("change", () => {
      const selectedPriceRange = priceFilter.value;
      const selectedCategory = categoryFilter.value;
      const searchTerm = searchInput.value;
      filterProducts(selectedPriceRange, selectedCategory, searchTerm);
    });

    // Event listener para o formulário de pesquisa
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value;
      const selectedPriceRange = priceFilter.value;
      const selectedCategory = categoryFilter.value;
      filterProducts(selectedPriceRange, selectedCategory, searchTerm);
    });

    // Exibir todos os produtos ao carregar a página
    filterProducts("", "", "");
  });
