// BUYS

const boughtBooksList = JSON.parse(localStorage.getItem("boughtBooksList")) || [];

const buysContainer = document.getElementById("buys-container");
const purchaseTotalQuantity = document.getElementById("purchase-total-quantity");

// ID From URL
const urlParams = new URLSearchParams(window.location.search);
const purchaseId = urlParams.get('purchaseId');

// Display empty message
if (boughtBooksList.length === 0) {
    buysContainer.innerHTML = `
        <div id="discover-books-container">
            <img src="../img/website/empty-bag.jpg">
            <p class="first-message">Start buying your first book at Library The Nest Of Books!</p>
            <p class="second-message">We handle free shipping ✔</p>
            <button class="button-general" id="discover-books-button">Discover Books!</button>
        </div>
    `;

    const discoverBooksButton = document.getElementById("discover-books-button");
    discoverBooksButton.addEventListener("click", () => {
        window.location.href = "../templates/home.html";
    });
} else { // Display BooksPurchases
    const groupedPurchases = groupPurchasesByType(boughtBooksList);

    groupedPurchases.forEach((group) => {
        const groupDiv = document.createElement("div");
        groupDiv.classList.add("purchase-group");

        group.purchases.forEach((purchase) => {
            const purchaseDiv = document.createElement("div");
            purchaseDiv.classList.add("purchase-info");
        
            const date = purchase.date ? new Date(purchase.date) : new Date();
            const formattedDate = isNaN(date.getTime()) ? "Unknown Date" : `${getMonthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
        
            const dateContainer = document.createElement("div");
            dateContainer.id = "date-container";
            dateContainer.innerHTML = `
                <p class="book-date">${formattedDate}</p>
            `;

            purchaseDiv.appendChild(dateContainer);
        
            purchase.toBuyList.forEach((book) => {
                const unityText = book.quantityToBuy === 1 ? "unity" : "unities";
        
                const bookContainer = document.createElement("div");
                bookContainer.id = "book-info-container";
        
                const bookImgDiv = document.createElement("div");
                bookImgDiv.id = "book-img";
                bookImgDiv.innerHTML = `
                    <img src="${book.image}" alt="${book.title}" title="${book.title}" class="book-image">
                `;
                bookImgDiv.addEventListener("click", () => {
                    showMessageWithImage(book);
                });

                const bookTextInfo = document.createElement("div");
                bookTextInfo.id = "book-text-info";
                bookTextInfo.innerHTML = `
                    <a href="../templates/book-detail.html?id=${encodeURIComponent(book.title)}" class="book-title">${book.title}</a>
                    <p class="book-author">${book.author}</p>
                    <p class="book-quantity">${book.quantityToBuy} ${unityText}</p>
                `;
        
                const buttonsContainer = document.createElement("div");
                buttonsContainer.id = "buttons-container";
                buttonsContainer.innerHTML = `
                    <button type="button" class="see-purchase-button">See Purchase</button>
                    <button type="button" class="buy-again-button">Buy Again</button>
                `;
        
                bookContainer.appendChild(bookImgDiv);
                bookContainer.appendChild(bookTextInfo);
                bookContainer.appendChild(buttonsContainer);
        
                purchaseDiv.appendChild(bookContainer);
        
                const seePurchaseButton = buttonsContainer.querySelector(".see-purchase-button");
                const buyAgainButton = buttonsContainer.querySelector(".buy-again-button");
        
                seePurchaseButton.addEventListener("click", () => {
                    const purchaseId = purchase.id;
                    window.location.href = `../templates/bought-books-detail.html?purchaseId=${encodeURIComponent(purchaseId)}`;
                });
                    
                buyAgainButton.addEventListener("click", () => {
                    window.location.href = `../templates/book-detail.html?id=${encodeURIComponent(book.title)}`;
                });
            });
        
            groupDiv.appendChild(purchaseDiv);
        });
        
        buysContainer.appendChild(groupDiv);
        
    });
}

const totalPurchases = boughtBooksList.reduce((total, order) => total + order.toBuyList.length, 0);
purchaseTotalQuantity.textContent = `Total Purchases: ${totalPurchases}`;

function groupPurchasesByType(purchases) {
    const groupedPurchases = [];

    purchases.forEach((order) => {
        const uniqueTitles = new Set(order.toBuyList.map((book) => book.title));

        if (uniqueTitles.size === 1) {
            groupedPurchases.push({
                isSingleType: true,
                purchases: [order],
            });
        } else {
            groupedPurchases.push({
                isSingleType: false,
                purchases: [order],
            });
        }
    });

    return groupedPurchases;
}

function getMonthName(monthIndex) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[monthIndex];
}

// Sweet Alert 2
function showMessageWithImage(book) {
    Swal.fire({
        title: book.title,
        text: `Author: ${book.author}`,
        imageUrl: book.image,
        imageWidth: 200,
        imageHeight: 300,
        imageAlt: book.title
    });
}
