// BOOK DETAILS

const listOfBooks = JSON.parse(localStorage.getItem("listOfBooks")) || [];
const listOfFavoriteBooks = JSON.parse(localStorage.getItem("favoriteBooksList")) || [];
let toBuyBookList = [];
let addedToCartList = JSON.parse(localStorage.getItem("addedToCartList")) || [];

// Obtain the URL Id's books
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');

// Find the proper book in the array's book.
const selectedBook = listOfBooks.find(book => book.title === bookId);

// Update the details of the template depending of the book
document.getElementById('book-image').src = selectedBook.image;
document.getElementById('book-title').textContent = selectedBook.title;
document.getElementById('book-author').textContent = `${selectedBook.author}`;
document.getElementById('book-price').textContent = `$${selectedBook.price}`;
document.getElementById('book-year').textContent = `Year: ${selectedBook.year}`;
document.getElementById('book-pages').textContent = `Pages: ${selectedBook.pages}`;
document.getElementById('book-synopsis').textContent = `${selectedBook.synopsis}`;
document.getElementById('book-quantity').textContent = `(${selectedBook.quantity} available)`;

// Quantity Colors Swapping 
const quantityElement = document.getElementById('book-quantity');

if (selectedBook.quantity === 1) {
    quantityElement.textContent = "Last Available!";
    quantityElement.style.color = "darkOrange";
    quantityElement.style.fontWeight = "bold";
    quantityElement.style.fontSize = "18px";
} else if (selectedBook.quantity === 0) {
    quantityElement.textContent = "Sold Out!";
    quantityElement.style.color = "darkRed";
    quantityElement.style.fontWeight = "bold";
    quantityElement.style.fontSize = "18px";

} else {
    quantityElement.textContent = `(${selectedBook.quantity} units)`;
}

quantityElement.classList.add("units");

// SOLD OUT Conditional
const buyButton = document.getElementById("buy-button");
const addToCartButton = document.getElementById("add-to-cart-button");
const quantitySelectLabel = document.getElementById("quantity-select-label");
const quantitySelect = document.getElementById("quantity-select");

if (selectedBook.quantity === 0) {
    buyButton.disabled = true;
    addToCartButton.disabled = true;
    buyButton.style.cursor = "not-allowed";
    addToCartButton.style.cursor = "not-allowed";
    quantitySelectLabel.style.display = "none";
    quantitySelect.style.display = "none";

    buyButton.addEventListener("mouseover", () => {
        quantityElement.style.color = "red";
    });

    addToCartButton.addEventListener("mouseover", () => {
        quantityElement.style.color = "red";
    });

    buyButton.addEventListener("mouseout", () => {
        quantityElement.style.color = "darkRed";
    });

    addToCartButton.addEventListener("mouseout", () => {
        quantityElement.style.color = "darkRed";
    });
} 
else {
    const quantitySelect = document.getElementById('quantity-select');

    for (let i = 1; i <= selectedBook.quantity; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} ${i === 1 ? 'unit' : 'units'}`;
        quantitySelect.appendChild(option);
    }}

// Buy and Add to Cart Button

buyButton.addEventListener("click", () => {

    toBuyBookList = [];
    let quantityToBuy = quantitySelect.value; 

    let bookInfo = {
        image: selectedBook.image,
        title: selectedBook.title,
        author: selectedBook.author,
        price: selectedBook.price,
        stockQuantity: selectedBook.quantity,
        quantityToBuy: quantityToBuy,
        total: (selectedBook.price * quantityToBuy).toFixed(2)
    };

    toBuyBookList.push(bookInfo);
    localStorage.setItem("toBuyBookList", JSON.stringify(toBuyBookList));

    window.location.href = `../templates/residence-form.html?id=${encodeURIComponent(selectedBook.title)}`;
});

addToCartButton.addEventListener("click", () => {
    let quantityToBuy = quantitySelect.value; 

    let newItemToCart = {
        image: selectedBook.image,
        title: selectedBook.title,
        author: selectedBook.author,
        price: selectedBook.price,
        stockQuantity: selectedBook.quantity,
        quantityToBuy: quantityToBuy,
        total: (selectedBook.price * quantityToBuy).toFixed(2)
    };

    addedToCartList.push(newItemToCart);
    localStorage.setItem("addedToCartList", JSON.stringify(addedToCartList));
    toastifyNotifications(`${selectedBook.title} has been added to the Cart`, "rgb(65, 155, 65)");

    setTimeout(() => {
        window.location.href = `../templates/home.html`;
    }, 1300);
});

// Change the template's title
const titleElement = document.querySelector('title');
titleElement.textContent = selectedBook.title;

const isFavorite = listOfFavoriteBooks.some(book => book.title === selectedBook.title);

// Update the star symbol in the template
const starSymbol = document.querySelector('.star-symbol');
starSymbol.textContent = isFavorite ? "★" : "☆";

// Add event listener to star symbol to toggle favorite status
starSymbol.addEventListener("click", () => {
    const isFavorite = listOfFavoriteBooks.some(book => book.title === selectedBook.title);
    if (isFavorite) {
        const index = listOfFavoriteBooks.findIndex(book => book.title === selectedBook.title);
        if (index !== -1) {
            listOfFavoriteBooks.splice(index, 1);
            starSymbol.textContent = "☆";2
            toastifyNotifications(`${selectedBook.title} has been removed from the favorite books list.`, "tomato");
        }
    } else {
        listOfFavoriteBooks.push(selectedBook);
        starSymbol.textContent = "★";
        toastifyNotifications(`${selectedBook.title} has been added to the favorite books list.`, "rgb(65, 155, 65)");
    }
    localStorage.setItem("favoriteBooksList", JSON.stringify(listOfFavoriteBooks));
});

// Display Random Books

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function getRandomBooks(listOfBooks) {
    const randomBooks = [];
    const totalBooks = listOfBooks.length;
    const indexes = [];
    
    while (indexes.length < 3) {
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
    const otherBooksCards = document.getElementById('other-books-cards');
    
    randomBooks.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('other-book-card');
        card.innerHTML = `
            <img src="${book.image}" alt="${book.title}" title="${book.title}">
            <div class="other-book-details">
            <div class="other-book-price">$${book.price}</div>
                <div class="other-book-title">${book.title}</div>
                <div class="announcement-other">Free Shipping ✔</div>
            </div>
        `;
        otherBooksCards.appendChild(card);
        
        card.addEventListener("click", () => {
            window.location.href = `book-detail.html?id=${encodeURIComponent(book.title)}`;
        });
    });
}

const randomBooks = getRandomBooks(listOfBooks);
displayRandomBooks(randomBooks);


// Library Toastify Notifications
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
