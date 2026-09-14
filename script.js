
let basket = [];

let burgerSection = document.getElementById("burger_section");


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

                            <h2>${burgers[i].price.toFixed(2)} €</h2>
                            <button onclick="addToBasket(burgers, ${i}, this)">Add to basket</button>

                        </div>
                        
                    </div>

                </div>
            </div>
        `;
    }
}

renderBurgers();


let pizzaSection = document.getElementById("pizza_section");


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

                            <h2>${pizzas[i].price.toFixed(2)} €</h2>
                            <button onclick="addToBasket(pizzas, ${i}, this)">Add to basket</button>

                        </div>
                        
                    </div>

                </div>
            </div>
        `;
    }
}

renderPizza();


let saladSection = document.getElementById("salad_section");


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

                            <h2>${salads[i].price.toFixed(2)} €</h2>
                            <button onclick="addToBasket(salads, ${i}, this)">Add to basket</button>

                        </div>
                        
                    </div>

                </div>
            </div>
        `;
    }
}

renderSalads();

function addToBasket(array, index, button) {

    let dish = array[index];

    let existingDish = basket.find(item => item.name == dish.name);

    if (existingDish) {
        existingDish.amount++;
    } else {
        basket.push({
            name: dish.name,
            price: dish.price,
            amount: 1
        });
    }

    button.innerText = `Added ${basket.find(item => item.name == dish.name).amount}`;

    renderBasket();

}

let basketItems = document.getElementById("basket_items");

function renderBasket() {

    basketItems.innerHTML = "";

    for (let i = 0; i < basket.length; i++) {
        
        basketItems.innerHTML += `
            <div class="basket_item">

                <span>${basket[i].amount} x ${basket[i].name}</span>

                <span>${(basket[i].price * basket[i].amount).toFixed(2)} €</span>

            </div>
        `;
        
    }
}
