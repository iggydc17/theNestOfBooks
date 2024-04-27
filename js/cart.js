// CART

const listOfBooks = JSON.parse(localStorage.getItem("listOfBooks"));
const addedToCartList = JSON.parse(localStorage.getItem("addedToCartList"));
const listOfFavoriteBooks = JSON.parse(localStorage.getItem("favoriteBooksList")) || [];
let toBuyList = JSON.parse(localStorage.getItem("toBuyBookList")) || [];

const cartContainer = document.getElementById("cart-container");
const freeShippingContainer = document.getElementById("free-shipping-container");
const cartItems = document.getElementById("cart-items");
const bookCards = document.getElementById("book-cards");
const purchaseSummaryContainer = document.getElementById("purchase-summary-container");
const continueShoppingButton = document.getElementById("continue-shopping-button");
const otherBooksContainer = document.getElementById("other-books-container");

// Hide the cart
const hideCart = () => {
    purchaseSummaryContainer.style.display = "none";
    otherBooksContainer.style.display = "none";
    freeShippingContainer.style.display = "none";
    cartItems.style.display = "none";
};

// Show the cart
const showCart = () => {
    otherBooksContainer.style.display = "block";
    freeShippingContainer.style.display = "block";
    purchaseSummaryContainer.style.display = "block";
    cartItems.style.display = "block";
};

// Show Empty Cart
const displayEmptyCart = () => {
    hideCart();
    cartContainer.style.margin = "0 auto";
    let discoverBooksDiv = document.createElement("div");
    discoverBooksDiv.innerHTML = `
        <img src="../img/website/cart-img.jpg">
        <p class="first-message">Start buying your first book at Library The Nest Of Books!</p>
        <p class="second-message">We handle free shipping ✔</p>
        <button id="discover-books-button">Discover Books!</button>
    `;
    discoverBooksDiv.id = "discover-books-container";
    cartContainer.appendChild(discoverBooksDiv);

    const discoverBooksButton = document.getElementById("discover-books-button");
    discoverBooksButton.addEventListener("click", () => {
        window.location.href = "../templates/home.html";
    });
};

// Display Cart Items
const displayCartItems = () => {
    addedToCartList.forEach((item, index) => {
        const newCartItem = document.createElement("div");

        newCartItem.innerHTML = `
            <div id="img-container">
                <img src="${item.image}" id="cart-img-${index}" alt="${item.title}" title="${item.title}">
            </div>
            <div id="title-author-buttons-quantity-container">
                <div id="title">${item.title}</div>
                <div id="author">${item.author}</div>
                <div id="buttons-container">
                    <button type="button" class="blue-btn remove-button">Remove</button>
                    <button class="blue-btn add-to-favs-button" data-index="${index}">Add To Favs</button>
                    <button class="blue-btn buy-now-button" data-index="${index}">Buy Now</button>
                </div>
                <div id="choose-quantity-container">
                    <button class="green-btn decrease-button" data-index="${index}"> - </button>
                    <input class="quantity-input" type="text" min="1" max="${item.quantityToBuy}" value="${item.quantityToBuy}">
                    <button class="green-btn increase-button" data-index="${index}"> + </button>   
                </div>
                <div id="quantity">${item.stockQuantity} available</div>
            </div>
            <div id="total-container-${index}">
                <div id="total">$${item.total}</div>
            </div>
        `;
        
        newCartItem.classList.add("cart-item-row");
        cartItems.appendChild(newCartItem);

        // Add border to last cart item and override border for other cart items
        if (addedToCartList.length >= 2) {
            newCartItem.style.borderBottom = "1px solid lightgray";
            freeShippingContainer.style.marginTop = "-13px";
        } else {
            newCartItem.style.borderBottom = "none";
        }        

        // Add event listeners for buttons cart items
        const removeButton = newCartItem.querySelector('.remove-button');
        const addToFavsButton = newCartItem.querySelector('.add-to-favs-button');
        const buyNowButton = newCartItem.querySelector('.buy-now-button');

        const decreaseButton = newCartItem.querySelector('.decrease-button');
        const quantityInput = newCartItem.querySelector('.quantity-input');
        const increaseButton = newCartItem.querySelector('.increase-button');

        // Remove item from cart
        removeButton.addEventListener("click", (event) => {
            event.stopPropagation();

            addedToCartList.splice(index, 1);
            localStorage.setItem("addedToCartList", JSON.stringify(addedToCartList));
            cartItems.removeChild(newCartItem);
            displayPurchaseSummary();
            toastifyNotifications(`${item.title} has been removed from the list.`, 'tomato');

            if (addedToCartList.length === 0) {
                displayEmptyCart();
            }
        });

        // Add item to favorites
        addToFavsButton.addEventListener("click", () => {

            const isAlreadyInFavorites = listOfFavoriteBooks.some(book => book.title === item.title);

            if (isAlreadyInFavorites) {
                    toastifyNotifications(`${item.title} is already in your favorites list.`);
            }
            else {
                    listOfFavoriteBooks.push(item);
                    localStorage.setItem("favoriteBooksList", JSON.stringify(listOfFavoriteBooks));
                    toastifyNotifications(`${item.title} has been added to favorites.`, 'gold');
            }        
        });    

        // Buy Now
        buyNowButton.addEventListener("click", () => {
            window.location.href = `../templates/book-detail.html?id=${encodeURIComponent(item.title)}`;
        });

        // Change quantity in cart items 
        decreaseButton.addEventListener("click", () => {
            if (item.quantityToBuy > 1) {
                item.quantityToBuy--;
                quantityInput.value = item.quantityToBuy;
                updateTotal(index, item.quantityToBuy);
            }
        });

        increaseButton.addEventListener("click", () => {
            if (item.quantityToBuy < item.stockQuantity) {
                item.quantityToBuy++;
                quantityInput.value = item.quantityToBuy;
                updateTotal(index, item.quantityToBuy);
            }
        });

        quantityInput.addEventListener("change", () => {
            const newQuantity = parseInt(quantityInput.value);
            if (newQuantity >= 1 && newQuantity <= item.stockQuantity) {
                item.quantityToBuy = newQuantity;
                updateTotal(index, newQuantity);
            } else {
                quantityInput.value = item.quantityToBuy;
            }    
        });
    });    
};

// Update total
const updateTotal = (index, newQuantity) => {
    const item = addedToCartList[index];
    const totalContainer = document.getElementById(`total-container-${index}`);
    item.total = item.price * newQuantity;
    totalContainer.innerHTML = `<div id="total">$${item.total.toFixed(2)}</div>`;
    
    displayPurchaseSummary();
};


// Verify if the cart is empty
if (!addedToCartList || addedToCartList.length === 0) {
    displayEmptyCart();
} else {
    displayCartItems();
    showCart();
}

// Toastify Notifications Library
const toastifyNotifications = (message, backgroundColor) => {
    Toastify({
        text: message,
        className: "info",
        style: {
            background: backgroundColor,
            borderRadius: "4px"
        }
    }).showToast();
}

// Purchase Summary 
const displayPurchaseSummary = () => {
    const productQuantity = document.getElementById("product-quantity");
    const productTotal = document.getElementById("product-total");

    const totalItems = addedToCartList.reduce((accumulator, item) => accumulator + parseInt(item.quantityToBuy), 0);
    const totalPrice = addedToCartList.reduce((accumulator, item) => accumulator + parseFloat(item.total), 0);

    productQuantity.innerHTML = `Quantity: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp${totalItems}`;
    productTotal.innerHTML = `<strong style="font-size: 20px;">Total: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $${totalPrice.toFixed(2)}</strong>`;};


    continueShoppingButton.addEventListener("click", () => {
        
        toBuyList = [];

        addedToCartList.forEach(item => {
            toBuyList.push(item);
        });
    
        localStorage.setItem("toBuyBookList", JSON.stringify(toBuyList));
    
        window.location.href = "../templates/residence-form.html";
    });

displayPurchaseSummary();
// Display Random Books to Buy

const randomBooks = getRandomBooks(listOfBooks);
function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function getRandomBooks(listOfBooks) {
    const randomBooks = [];
    const totalBooks = listOfBooks.length;
    const indexes = [];
    
    while (indexes.length < 5) {
        const randomIndex = getRandomIndex(totalBooks);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    
    indexes.forEach(index => {
        randomBooks.push(listOfBooks[index]);
    });
    
    return randomBooks;
}

function displayRandomBooks(randomBooks) {
    const bookCards = document.getElementById('book-cards');
    
    randomBooks.forEach(book => {
        const card = document.createElement('div');

        card.classList.add('other-book-card');
        card.innerHTML = `
        <div>
            <img src="${book.image}" alt="${book.title}" title="${book.title}">
            <div class="other-book-details">
            <div class="other-book-price">$${book.price}</div>
                <div class="other-book-title">${book.title}</div>
                <div class="announcement-other">Free Shipping ✔</div>
            </div>
        </div>            
        `;

        card.id = "card";
        bookCards.appendChild(card);

        // Go to Books Details
        
        card.addEventListener("click", () => {
            window.location.href = `book-detail.html?id=${encodeURIComponent(book.title)}`;
        });
    });
}

displayRandomBooks(randomBooks);