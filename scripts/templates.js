
// getDishesItemTemplate() is a template function for the HTML code needed inside renderDishes()
function getDishesItemTemplate(dish, index, className, arrayName) {
    return `
        <div class="${className}">
            <div class="${className}_entry">

                <img src="${dish.image_url}" alt="${dish.name}">

                <div class="${className}_info">

                    <div class="${className}_name_desc">
                        <h2>${dish.name}</h2>
                        <span>${dish.description}</span>
                    </div>
                        
                    <div class="burger_price_button">
                        <h2>${formatPrice(dish.price)} €</h2>
                        <button id="${className}Button${index}" onclick="addToBasket(${arrayName}, ${index}, this)">
                            Add to basket
                        </button>
                    </div>
                        
                </div>

            </div>
        </div>
    `;
}

// getBasketItemTemplate() is a template function for the HTML code needed inside renderBasket()
function getBasketItemTemplate(item, index) {
    return `
        <div class="basket_item">

            <div class="item_name">
                <span>${item.amount} x ${item.name}</span>
                ${item.amount > 1 ? `
                    <button class="amount_button" onclick="removeFromBasket(${index})">
                        <img src="./img/delete.png" alt="delete item">
                    </button>
                ` : ""}
            </div>

            <div class="item_amount_price">

                <div class="item_amount">

                    ${item.amount == 1 ? `
                        <button class="amount_button" onclick="removeFromBasket(${index})">
                            <img src="./img/delete.png" alt="delete item">
                        </button>
                    ` : ""}

                    ${item.amount > 1 ? `
                        <button class="amount_button" onclick="decreaseAmount(${index})">
                            -
                        </button>
                    ` : ""}

                    <span>${item.amount}</span>

                    <button class="amount_button" onclick="increaseAmount(${index})">
                        +
                    </button>

                </div>

                <span>${formatPrice(item.price * item.amount)} €</span>

            </div>

        </div>
    `;
}