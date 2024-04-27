// BOUGHT BOOK DETAIL

const boughtBooksList = JSON.parse(localStorage.getItem("boughtBooksList")) || [];

const detailPurchasedBookContainer = document.getElementById("detail-purchased-book-container");
const totalPayContainer = document.getElementById("total-pay-container");
const residenceDetailsContainer = document.getElementById("residence-details-container");
const paymentDetailsContainer = document.getElementById("payment-details-container");

// ID From URL
const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id');
const purchaseId = urlParams.get('purchaseId');

// Obtain the Book Info
const currentPurchase = boughtBooksList.find(order => order.id === purchaseId)
const purchasedBooks = currentPurchase.toBuyList;

const renderPurchasedBook = (purchasedBook) => {
    return `
    <div>
        <div id="img-title-quantity-container">
            <div id="image-detail">
                <img src="${purchasedBook.image}" title="${purchasedBook.title}">
            </div>
            <div id="title-and-quantity">
                <p><span class="title">${purchasedBook.title}</span> - <span class="author">${purchasedBook.author}</span></p>
                <p class="quantity-and-price">Quantity: ${purchasedBook.quantityToBuy} | Price: $${purchasedBook.price}</p>
            </div>
        </div>
        <p class="total">Total: <span class="total-price">$${purchasedBook.total}</span></p>
    </div>`;
}

if (purchasedBooks) {
    const header = `<div id="title-container">
        <div>
            <i class="bi bi-book"></i>
        </div>
        <h4 class="h4-titles">Purchased Book Details</h4>
    </div>`;
    detailPurchasedBookContainer.innerHTML = `${header}${purchasedBooks.map(renderPurchasedBook).join('')}`;
} else {
    detailPurchasedBookContainer.innerHTML = `<p>Book details not found.</p>`;
}

// Obtain the Address Info
if (boughtBooksList.length > 0 && boughtBooksList[0].addressList.length > 0) {
    const shippingAddress = boughtBooksList[0].addressList[0];
    residenceDetailsContainer.innerHTML = `
        <div id="title-container">
            <div>
                <i class="bi bi-geo-alt"></i>
            </div>
            <h4 class="h4-titles">Shipping Address Details</h4>
        </div>    
        <div id="address-container">
            <p class="address-info-row">${shippingAddress.residenceAddress} ${shippingAddress.residenceNumber} - ${shippingAddress.residenceCity} - ${shippingAddress.residenceState} | <strong>C.P. ${shippingAddress.CP}</strong></p>
            <p class="user-info-row">${shippingAddress.fullName} - ${shippingAddress.telephone}</p>
        </div>`;
}

// Obtain the Payment Info
if (boughtBooksList.length > 0 && boughtBooksList[0].paymentList.length > 0) {
    const currentOrder = boughtBooksList.find(order => order.id === purchaseId);

    if (currentOrder) {
        const paymentMethod = currentOrder.paymentList[0];
        const paymentDetailBox = document.createElement("div");

        if (paymentMethod.cryptoType) {
            paymentDetailBox.innerHTML = `
            <h4 class="h4-titles">Payment Method Details</h4>
            <div id="crypto-payment-detail-box">
                <div>
                    <img src="${paymentMethod.cryptoLogo}">
                </div>
                <div id="crypto-text-box">
                    <p class="crypto-text">${paymentMethod.totalAmount}</p>
                    <p class="crypto-text">${paymentMethod.cryptoAddress}</p>
                    <p class="crypto-text">${paymentMethod.address}</p>
                </div>
            </div>
            `;
        } else {
            const formattedCardNumber = paymentMethod.cardNumber.match(/.{1,4}/g).join('-');
            const creditOrDebitUpper = `<strong>${paymentMethod.cardType.toUpperCase()}</strong>`;
            paymentDetailBox.innerHTML = `
            <h4 class="payment-title">Payment Method Details</h4>
            <div id="payment-detail-box">
                <div>
                    <img src="${paymentMethod.cardLogo}">
                </div>
                <div>
                    <p class="crypto-text">${creditOrDebitUpper} Card: ${formattedCardNumber}</p>
                </div>
            </div>
            `;
        }

        paymentDetailBox.id = "payment-detail";
        paymentDetailsContainer.innerHTML = "";
        paymentDetailsContainer.appendChild(paymentDetailBox);
    }
}

const renderPurchaseSummaryLine = (purchasedBook) => {
    const totalQuantity = parseInt(purchasedBook.quantityToBuy);
    const price = parseFloat(purchasedBook.price);

    return `
    <div>
    <p id="product-title"><strong>${purchasedBook.title}</strong> - ${purchasedBook.author}</p>
    <p id="product-quantity">Unity Price: $${price.toFixed(2)}</p>
    <p id="product-price">Quantity: ${totalQuantity}</p>
    </div>`
}

// Purchase Summary Detail Info
document.addEventListener("DOMContentLoaded", function () {
    // Obtain the current purchase
    const currentPurchase = boughtBooksList.find(order => order.id === purchaseId);
    
    if (currentPurchase) {
        // Calculate total price
        const totalPrice = currentPurchase.toBuyList.reduce((accumulator, item) => {
            return accumulator + parseFloat(item.total);
        }, 0);

        const purchaseSummaryList = document.getElementById("purchase-summary-list");
        purchaseSummaryList.innerHTML = currentPurchase.toBuyList.map(renderPurchaseSummaryLine).join('');
        const productDate = document.getElementById("product-date");
        const paymentMethodElement = document.getElementById("payment-method");
        const cardNumber = document.getElementById("card-number");
        const cryptoAddress = document.getElementById("crypto-address");
        const cryptoTotal = document.getElementById("crypto-total");
        const productTotal = document.getElementById("product-total");
        const buyAgainButton = document.getElementById("buy-again-button");

        const purchaseDate = new Date(currentPurchase.date);
        const formattedDate = `${(purchaseDate.toLocaleDateString('default', {month: 'long'}))} ${purchaseDate.getDate()}, ${purchaseDate.getFullYear()}`;
        
        // Update product total with totalPrice
        productTotal.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
        productDate.textContent = `${formattedDate}`;

        // Fill in payment method details if available
        if (currentPurchase.paymentList && currentPurchase.paymentList.length > 0) {
            const payment = currentPurchase.paymentList[0];
            paymentMethodElement.textContent = `Payment Method: ${payment.cardType ? payment.cardType.toUpperCase() : payment.cryptoType.toUpperCase()}`;
            if (payment.cardType) {
                cardNumber.textContent = `Card Number: ${payment.cardNumber}`;
            } else if (payment.cryptoType) {
                cryptoAddress.textContent = `Address: ${payment.cryptoAddress}`;
                const regex = /<strong>(.*?)<\/strong>/;
                const match = payment.totalAmount.match(regex);
                if (match && match.length > 1) {
                    cryptoTotal.innerHTML = `<strong>Total Paid: ${match[1]}</strong>`;
                }
            }
        }

        // Set up Buy Again button event listener
        if (currentPurchase.toBuyList.length > 1) {
            buyAgainButton.addEventListener("click", () => {
                window.location.href = `../templates/home.html`;
            });
        } else if (currentPurchase.toBuyList.length === 1) {
            const purchasedBookTitle = currentPurchase.toBuyList[0].title;
            buyAgainButton.addEventListener("click", () => {
                window.location.href = `../templates/book-detail.html?id=${encodeURIComponent(purchasedBookTitle)}`;
            });
        }
    }    
});

// Get Month Name
function getMonthName(monthIndex) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
}

// Library SweetAlert2

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

const detailContainers = document.querySelectorAll("#img-title-quantity-container");
detailContainers.forEach(container => {
    container.style.cursor = "pointer";
    container.addEventListener("click", () => {
        const bookTitle = container.getAttribute("data-book-title");
        const book = boughtBooksList.flatMap(order => order.toBuyList).find(book => book.title === bookTitle);
        if (book) {
            showMessageWithImage(book);
        }
    });
});
