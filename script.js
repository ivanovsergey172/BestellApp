
// basket array created

let basket = [];

// burger section defined in JS

let burgerSection = document.getElementById("burger_section");

// renderBurgers() updates the burger section from db.js

function renderBurgers() {
    
    burgerSection.innerHTML = ""; 

    for (let i = 0; i < burgers.length; i++) {

        burgerSection.innerHTML += `
            <div class="burger">
                <div class="burger_entry">

                    <img src="${burgers[i].image_url}" alt="${burgers[i].name}">

                    <div class="burger_info">

                        <div class="burger_name_desc">

                            <h2>${burgers[i].name}</h2>
                            <span>${burgers[i].description}</span>

                        </div>
                        
                        <div class="burger_price_button">

                            <h2>${formatPrice(burgers[i].price)} €</h2>
                            <button id="burgerButton${i}" onclick="addToBasket(burgers, ${i}, this)">Add to basket</button>

                        </div>
                        
                    </div>

                </div>
            </div>
        `;
    }
}

renderBurgers();

// pizza section defined in JS

let pizzaSection = document.getElementById("pizza_section");

// renderPizza() updates the pizza section from db.js

function renderPizza() {
    
    pizzaSection.innerHTML = ""; 

    for (let i = 0; i < pizzas.length; i++) {

        pizzaSection.innerHTML += `
            <div class="pizza">
                <div class="pizza_entry">

                    <img src="${pizzas[i].image_url}" alt="${pizzas[i].name}">

                    <div class="pizza_info">

                        <div class="pizza_name_desc">

                            <h2>${pizzas[i].name}</h2>
                            <span>${pizzas[i].description}</span>

                        </div>
                        
                        <div class="pizza_price_button">

                            <h2>${formatPrice(pizzas[i].price)} €</h2>
                            <button id="pizzaButton${i}" onclick="addToBasket(pizzas, ${i}, this)">Add to basket</button>

                        </div>
                        
                    </div>

                </div>
            </div>
        `;
    }
}

renderPizza();

// salad section defined in JS

let saladSection = document.getElementById("salad_section");

// renderSalads() updates the salad section from db.js

function renderSalads() {
    
    saladSection.innerHTML = ""; 

    for (let i = 0; i < salads.length; i++) {

        saladSection.innerHTML += `
            <div class="salad">
                <div class="salad_entry">

                    <img src="${salads[i].image_url}" alt="${salads[i].name}">

                    <div class="salad_info">

                        <div class="salad_name_desc">

                            <h2>${salads[i].name}</h2>
                            <span>${salads[i].description}</span>

                        </div>
                        
                        <div class="salad_price_button">

                            <h2>${formatPrice(salads[i].price)} €</h2>
                            <button id="saladButton${i}" onclick="addToBasket(salads, ${i}, this)">Add to basket</button>

                        </div>
                        
                    </div>

                </div>
            </div>
        `;
    }
}

renderSalads();

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

// basket items defined in JS

let basketItems = document.getElementById("basket_items");

// renderBasket() updates the basket view if something changes

function renderBasket() {

    basketItems.innerHTML = "";

    for (let i = 0; i < basket.length; i++) {
        
        basketItems.innerHTML += `
            <div class="basket_item">

                <div class="item_name">
                    <span>${basket[i].amount} x ${basket[i].name}</span>
                </div>

                <div class="item_amount_price">

                    <div class="item_amount">

                        <button class="amount_button" onclick="removeFromBasket(${i})">
                            <img src="./img/delete.png" alt="delete item">
                        </button>

                        <span>${basket[i].amount}</span>

                        <button class="amount_button" onclick="increaseAmount(${i})">
                            +
                        </button>

                    </div>

                    <span>${formatPrice(basket[i].price * basket[i].amount)} €</span>

                </div>

            </div>
        `;
        
    }
}

// increaseAmount() increases the amount of a dish, when the "+" button is pressed

function increaseAmount(index) {

    basket[index].amount++;

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

// delivery fee defined in JS

let deliveryFee = 4.99;

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

// subtotal, total and buy_button defined in JS

let subtotalElement = document.getElementById("subtotal");
let totalElement = document.getElementById("total");
let buyButton = document.getElementById("buy_button");

// renderCalculation() updates the prices for the subtotal amount, total amount and inside the buy now button

function renderCalculation() {

    let subtotal = calculateSubtotal();
    let total = subtotal + deliveryFee;

    subtotalElement.innerText = `${formatPrice(subtotal)} €`;
    totalElement.innerText = `${formatPrice(total)} €`;

    buyButton.innerText = `Buy now (${formatPrice(total)} €)`;
}

// order_popup, close_popup and basket defined in JS

let orderPopup = document.getElementById("order_popup");
let closePopup = document.getElementById("close_popup");
let basketElement = document.getElementById("basket");

// emptyBasket() clears the basket items and also renders all relevant areas so that a new order can be made

function emptyBasket() {
    basket = [];
    
    renderBasket();
    renderCalculation();

    renderBurgers();
    renderPizza();
    renderSalads();
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
    }, 5000);
}

// closePopupWindow() gets executed either automatically after 5 seconds or by pressing the "close" button inside the popup 

function closePopupWindow() {
    orderPopup.classList.remove("show");
}