// Menu Toggle
var MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";
function menutoggle() {
    if (MenuItems.style.maxHeight == "0px") {
        MenuItems.style.maxHeight = "200px";
    } else {
        MenuItems.style.maxHeight = "0px";
    }
}

// Check current page and run appropriate logic
document.addEventListener("DOMContentLoaded", () => {
    const currentPagePath = window.location.pathname;

    // Halaman Home
    if (currentPagePath.includes("index.html") || currentPagePath === "/" || currentPagePath === "") {
        document.querySelectorAll(".col-4").forEach(product => {
            product.classList.add("active");
        });
    }

    // Halaman Produk Detail
    if (currentPagePath.includes("product_details.html")) {
        document.querySelectorAll(".col-4").forEach(product => {
            product.classList.add("active");
        });

        const ProductImg = document.getElementById("ProductImg");
        const smallImgs = document.querySelectorAll(".small-img");

        smallImgs.forEach(img => {
            img.addEventListener("click", () => {
                ProductImg.src = img.src;
            });
        });
    }

    // Halaman Semua Produk
    if (currentPagePath.includes("products.html")) {
        const productsPerPage = 12;
        let currentPage = 1;
        let products = [];
        let filteredProducts = [];

        const productList = document.querySelector(".product-list");
        products = Array.from(document.querySelectorAll(".col-4")).map((product) => ({
            element: product,
            price: parseInt(product.getAttribute("data-price")),
            sales: parseInt(product.getAttribute("data-sales")),
        }));
        filteredProducts = [...products];

        const sortFilter = document.getElementById("sortFilter");
        sortFilter.addEventListener("change", sortProducts);

        renderProducts();
        renderPagination();

        function sortProducts() {
            const sortValue = document.getElementById("sortFilter").value;
            filteredProducts = [...products];

            if (sortValue === "termurah") {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortValue === "termahal") {
                filteredProducts.sort((a, b) => b.price - a.price);
            } else if (sortValue === "terlaris") {
                filteredProducts.sort((a, b) => b.sales - a.sales);
            } else {
                filteredProducts = [...products];
            }

            currentPage = 1;
            renderProducts();
            renderPagination();
        }

        function renderProducts() {
            const productList = document.querySelector(".product-list");
            productList.innerHTML = "";

            const start = (currentPage - 1) * productsPerPage;
            const end = start + productsPerPage;
            const paginatedProducts = filteredProducts.slice(start, end);

            let row = document.createElement("div");
            row.className = "row";
            paginatedProducts.forEach((product, index) => {
                product.element.classList.add("active");
                row.appendChild(product.element);
                if ((index + 1) % 4 === 0 || index === paginatedProducts.length - 1) {
                    productList.appendChild(row);
                    row = document.createElement("div");
                    row.className = "row";
                }
            });

            if (row.children.length > 0) {
                productList.appendChild(row);
            }
        }

        // Pagination
        function renderPagination() {
            const pagination = document.getElementById("pagination");
            pagination.innerHTML = "";

            const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

            const prevBtn = document.createElement("span");
            prevBtn.innerHTML = "←";
            prevBtn.addEventListener("click", () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderProducts();
                    renderPagination();
                }
            });
            pagination.appendChild(prevBtn);

            for (let i = 1; i <= pageCount; i++) {
                const pageBtn = document.createElement("span");
                pageBtn.innerText = i;
                pageBtn.className = i === currentPage ? "active" : "";
                pageBtn.addEventListener("click", () => {
                    currentPage = i;
                    renderProducts();
                    renderPagination();
                });
                pagination.appendChild(pageBtn);
            }

            const nextBtn = document.createElement("span");
            nextBtn.innerHTML = "→";
            nextBtn.addEventListener("click", () => {
                if (currentPage < pageCount) {
                    currentPage++;
                    renderProducts();
                    renderPagination();
                }
            });
            pagination.appendChild(nextBtn);
        }
    }

    // Halaman Keranjang
    if (currentPagePath.includes("cart.html")) {
        updateCart();

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                button.closest("tr").remove();
                updateCart();
            });
        });

        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("change", () => {
                if (input.value < 1) {
                    input.value = 1;
                }
                updateCart();
            });
        });

        function updateCart() {
            const cartItems = document.querySelectorAll(".cart-item");
            let subtotal = 0;
            let totalQuantity = 0;

            cartItems.forEach(item => {
                const price = parseInt(item.getAttribute("data-price"));
                const quantity = parseInt(item.querySelector(".quantity-input").value);
                const itemSubtotal = price * quantity;
                item.querySelector(".subtotal").textContent = formatCurrency(itemSubtotal);
                subtotal += itemSubtotal;
                totalQuantity += quantity;
            });

            const shippingCost = Math.ceil(totalQuantity / 5) * 30000;

            document.getElementById("subtotal").textContent = formatCurrency(subtotal);
            document.getElementById("shipping").textContent = formatCurrency(shippingCost);
            document.getElementById("total").textContent = formatCurrency(subtotal + shippingCost);
        }

        function formatCurrency(amount) {
            return amount.toLocaleString("id-ID") + " IDR";
        }
    }
});