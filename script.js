
// basket array created

let basket = [];

// burger section defined in JS

let burgerSection = document.getElementById("burger_section");

// pizza section defined in JS

let pizzaSection = document.getElementById("pizza_section");

// salad section defined in JS

let saladSection = document.getElementById("salad_section");

// basket items defined in JS

let basketItems = document.getElementById("basket_items");

// delivery fee defined in JS

let deliveryFee = 4.99;

// subtotal, total and buy_button defined in JS

let subtotalElement = document.getElementById("subtotal");
let totalElement = document.getElementById("total");
let buyButton = document.getElementById("buy_button");

// order_popup, close_popup and basket defined in JS

let orderPopup = document.getElementById("order_popup");
let closePopup = document.getElementById("close_popup");
let basketElement = document.getElementById("basket");

// renderDishes() updates the burger, pizza and salad sections from db.js

function renderDishes(array, section, className, arrayName) {
    section.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        
        section.innerHTML += `
            <div class="${className}">
                <div class="${className}_entry">

                    <img src="${array[i].image_url}" alt="${array[i].name}">

                    <div class="${className}_info">

                        <div class="${className}_name_desc">
                            <h2>${array[i].name}</h2>
                            <span>${array[i].description}</span>
                        </div>
                        
                        <div class="burger_price_button">
                            <h2>${formatPrice(array[i].price)} €</h2>
                            <button id="${className}Button${i}" onclick="addToBasket(${arrayName}, ${i}, this)">
                                Add to basket
                            </button>
                        </div>
                        
                    </div>

                </div>
            </div>
        `;
    }
}

renderDishes(burgers, burgerSection, "burger", "burgers");
renderDishes(pizzas, pizzaSection, "pizza", "pizzas");
renderDishes(salads, saladSection, "salad", "salads");

// getBasketItemTemplate() is a template function for the HTML code needed inside renderBasket()

function getBasketItemTemplate(item, index) {
    return `
        <div class="basket_item">

            <div class="item_name">
                <span>${item.amount} x ${item.name}</span>
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

// renderBasket() updates the basket view if something changes

function renderBasket() {
    basketItems.innerHTML = "";

    for (let i = 0; i < basket.length; i++) {
        basketItems.innerHTML += getBasketItemTemplate(basket[i], i);
    }
}

// addToBasket() adds new items to the basket or increases the amount of existing items

function addToBasket(array, index, button) {
    let dish = array[index];

    let existingDish = basket.find(item => item.name == dish.name);

    // if the dish already exists, increase amount. Else add the new dish to the basket
    if (existingDish) {
        existingDish.amount++;
    } else {
        basket.push({
            name: dish.name,
            price: dish.price,
            amount: 1,
            category: array,
            index: index
        });
    }

    // update the "add to basket" button to "added: 1" etc.
    button.innerText = `Added ${basket.find(item => item.name == dish.name).amount}`;
    button.classList.add("basket_added");

    renderBasket();
    renderCalculation();
}

// increaseAmount() increases the amount of a dish, when the "+" button is pressed

function increaseAmount(index) {
    basket[index].amount++;

    updateAddButton(basket[index]);

    renderBasket();
    renderCalculation();
}

// decreaseAmount() decreases the amount of a dish, when the "-" button is pressed

function decreaseAmount(index) {
    basket[index].amount--;

    updateAddButton(basket[index]);

    renderBasket();
    renderCalculation();
}

// removeFromBasket() removes the item from basket if the "trash" button is pressed

function removeFromBasket(index) {
    let item = basket[index];
    let button;

    if (item.category == burgers) {
        button = document.getElementById(`burgerButton${item.index}`);
    } else if (item.category == pizzas) {
        button = document.getElementById(`pizzaButton${item.index}`);
    } else if (item.category == salads) {
        button = document.getElementById(`saladButton${item.index}`);
    }

    // button next to the dish changes back to "add to basket"
    button.innerText = `Add to basket`;
    button.classList.remove("basket_added");

    basket.splice(index, 1);

    renderBasket();
    renderCalculation();
}

// update the "add to basket" button to "added: 1" etc.

function updateAddButton(item) {
    let button;

    if (item.category == burgers) {
        button = document.getElementById(`burgerButton${item.index}`);
    } else if (item.category == pizzas) {
        button = document.getElementById(`pizzaButton${item.index}`);
    } else if (item.category == salads) {
        button = document.getElementById(`saladButton${item.index}`);
    }

    button.innerText = `Added ${item.amount}`;
    button.classList.add("basket_added");
}

// calculates the subtotal price and returns the value

function calculateSubtotal() {
    let subtotal = 0;

    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].amount; 
    }
    return subtotal;
}

// calculates the total price (subtotal + delivery fee) and returns the value

function calculateTotal() {
    let subtotal = calculateSubtotal();
    let total = subtotal + deliveryFee;
    return total;
}

// formatPrice() changes the "." to a "," in prices
// necessary, because the page shows prices as "11,90 €" whereas the calculation uses "11.90 €" to not confuse the code

function formatPrice(price) {
    return price.toFixed(2).replace(".", ",");
}

// renderCalculation() updates the prices for the subtotal amount, total amount and inside the buy now button

function renderCalculation() {
    let subtotal = calculateSubtotal();
    let total = subtotal + deliveryFee;

    subtotalElement.innerText = `${formatPrice(subtotal)} €`;
    totalElement.innerText = `${formatPrice(total)} €`;
    buyButton.innerText = `Buy now (${formatPrice(total)} €)`;
}

// emptyBasket() clears the basket items and also renders all relevant areas so that a new order can be made

function emptyBasket() {
    basket = [];
    
    renderBasket();
    renderCalculation();
    renderDishes(burgers, burgerSection, "burger", "burgers");
    renderDishes(pizzas, pizzaSection, "pizza", "pizzas");
    renderDishes(salads, saladSection, "salad", "salads");
}

// openBasket() is only working on narrower screens (mobile / tablet view) and opens the basket from the navbar

function openBasket() {
    basketElement.classList.add("show");
}

// closeBasket() hides the basket again

function closeBasket() {
    basketElement.classList.remove("show");
}

// buyOrder() is the function that gets executed by the "buy now" button
// clears and hides the basket, shows the confirmation popup and closes it automatically after 5 sec

function buyOrder() {
    emptyBasket();
    closeBasket();

    orderPopup.classList.add("show");

    setTimeout(function() {
        closePopupWindow();
    }, 2000);
}

// closePopupWindow() gets executed either automatically after 5 seconds or by pressing the "close" button inside the popup 

function closePopupWindow() {
    orderPopup.classList.remove("show");
}