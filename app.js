const PRODUCTS_KEY_NAME = "products";

function addProduct(event) {
    event.preventDefault(); // prevent form submission
    const data = collectDataFromForm();
    const newTR = generateTR(data);
    injectTRToDOM(newTR);
    saveProductToLocalStorage(data);
    clearForm();
}


function collectDataFromForm() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const type = document.getElementById("product-type").value;
    const pic = document.getElementById("product-pic").value;

    return {
        name,
        price,
        type,
        pic,
    };
}



function generateTR(data) {
    const newTR = `
        <tr >
            <td>${data.name}</td>
            <td>${data.price}</td>
            <td>${data.type}</td>
            <td><img class="product-pic"
                    src="${data.pic}">
            </td>
            <td> <button>delete</button>
        </tr>
    `;
    return newTR;
}

function injectTRToDOM(newTR) {
    document.getElementById("product-list").innerHTML += newTR;
}

function loadProductsFromStorage() {
    const productsJSON = localStorage.getItem(PRODUCTS_KEY_NAME);
    if (productsJSON) {
        const products = JSON.parse(productsJSON);
        for (const product of products) {
            const newTR = generateTR(product);
            injectTRToDOM(newTR);
        }
    }
}

function saveProductToLocalStorage(product) {
    const productsJSON = localStorage.getItem(PRODUCTS_KEY_NAME) || "[]";
    const products = JSON.parse(productsJSON);
    products.push(product);
    localStorage.setItem(PRODUCTS_KEY_NAME, JSON.stringify(products));
}

function clearForm() {
    document.getElementById("product-form").reset();
}

loadProductsFromStorage();