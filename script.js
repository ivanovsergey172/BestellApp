
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
                            <button>Add</button>

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
                            <button>Add</button>

                        </div>
                        
                    </div>

                </div>
            </div>
        `;
    }
}

renderPizza();
