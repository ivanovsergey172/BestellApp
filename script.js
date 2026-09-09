
let burgerSection = document.getElementById("burger_section");


function renderBurgers() {
    
    burger_section.innerHTML = ""; 

    for (let i = 0; i < burgers.length; i++) {

        burger_section.innerHTML += `
            <div class="burger">
                <div class="burger_entry">

                    <img src="${burgers[i].image_url}" alt="${burgers[i].name}">

                    <div class="burger_info">
                        <h2>${burgers[i].name}</h2>
                        <h2>${burgers[i].price.toFixed(2)} €</h2>

                        <span>${burgers[i].description}</span>
                    </div>

                </div>
            </div>
        `;
    }
}

renderBurgers();