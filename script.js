const main = document.getElementById("main");
const section1 = document.getElementById("section1");
const inputlarotasi = document.getElementById("inputlarotasi");
const qidiruvinputi = document.getElementById("qidiruvinputi");
const addBtn = document.getElementById("addbutton");
const productsbox = document.getElementById("productsbox");
const categorySelect = document.getElementById("categoryselect");
const narxiSelect = document.getElementById("narxiselect");

let products = [];


async function getProducts() {
    const javob = await fetch("https://6773ea8077a26d4701c6ba70.mockapi.io/Products");
    products = await javob.json();
    productsView(products); 
}
getProducts();


function productsView(data) {

    productsbox.innerHTML = "";

    data.forEach(product => {

        const div = document.createElement("div");

        div.setAttribute("data-id", product.id);

        div.innerHTML = `

            <br>

            <h1 class="green kattatext">${product.name}</h1><br><br>

            <div class="haqida">
                <h3 class="yellow">Soni: ${product.count}</h3>
                <h3 class="white">${product.class}</h3>
            </div>

            <br><br>

            <h1 class="red kattatext5">${product.cost}$</h1>
            <br><br>

        `;
        div.classList.add("box");

        productsbox.appendChild(div);
    });
}


qidiruvinputi.addEventListener("input", () => {

    const searchValue = qidiruvinputi.value.toLowerCase();

    const filteredProducts = products.filter(product => 

        product.name.toLowerCase().includes(searchValue)
    );
    
    productsView(filteredProducts);
});


categorySelect.addEventListener("change", () => {
    const selectedCategory = categorySelect.value;
    const filteredProducts = products.filter(product => 
        product.class === selectedCategory
    );
    productsView(filteredProducts);
});

narxiSelect.addEventListener("change", () => {
    const sortOrder = narxiSelect.value;
    let sortedProducts = [...products];

    if (sortOrder === "Kichikdan Kattaga") {
        sortedProducts.sort((a, b) => a.cost - b.cost);
    } else if (sortOrder === "Kattadan Kichikka") {
        sortedProducts.sort((a, b) => b.cost - a.cost);
    }

    productsView(sortedProducts);
});






addBtn.addEventListener("click", async () => {

    const ism = document.getElementById("ism").value;

    const narx = parseFloat(document.getElementById("narx").value);

    const soni = parseInt(document.getElementById("soni").value);

    const category = document.getElementById("category").value;
    

    if (ism && narx && soni && category) {
        const newProduct = {
            name: ism,
            cost: narx,
            count: soni,
            class: category
        };




        const response = await fetch("https://6773ea8077a26d4701c6ba70.mockapi.io/Products", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newProduct)
        });

        if (response.ok) {

            alert("Product muvaffaqiyatli qo'shildi!");

            getProducts(); 
        } else {

            alert("Product qo'shishda xatolik yuz berdi.");
        }
    } else {
        
        alert("Barcha maydonlarni to'ldiring!");
    }
});
