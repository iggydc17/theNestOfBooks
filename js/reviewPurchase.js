// REVIEW PURCHASE

let boughtBooksList = JSON.parse(localStorage.getItem("boughtBooksList")) || [];

// Lists From LocalStorage

const listOfBooks = JSON.parse(localStorage.getItem("listOfBooks")) || [];
const toBuyList = JSON.parse(localStorage.getItem("toBuyBookList")) || [];
const addressList = JSON.parse(localStorage.getItem("addressList")) || [];
const paymentList = JSON.parse(localStorage.getItem("paymentList")) || [];
const addedToCartList = JSON.parse(localStorage.getItem("addedToCartList")) || [];

// Containers
const shippingInfoContainer = document.getElementById("shipping-info-container");
const reviewProductContainer = document.getElementById("review-product-container");
const paymentDetailContainer = document.getElementById("payment-detail-container");
const purchaseSummaryContainer = document.getElementById("purchase-summary-container");
const purchaseSummaryTitle = document.getElementById("purchase-summary-title");

// Buttons
const chooseAnotherAddressButton = document.getElementById("choose-another-address-button");
const confirmPurchaseButton = document.getElementById("confirm-purchase-button");


const makeUniqueId = val =>
    crypto.subtle
        .digest('SHA-256', new TextEncoder('utf-8').encode(val))
        .then(h => {
        let hexes = [],
            view = new DataView(h);
        for (let i = 0; i < view.byteLength; i += 4)
            hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
        return hexes.join('');
});


// Obtain the Address User

const displayAddressInfo = (addressList) => {
    addressList.forEach((addInfo) => {
        let infoDiv = document.createElement("div");
    
        infoDiv.innerHTML = `
        <div>
            <p class="cp-info">C.P. ${addInfo.CP}</p>
            <p class="address-info-row"> ${addInfo.residenceAddress} ${addInfo.residenceNumber} - ${addInfo.residenceCity} - ${addInfo.residenceState}</p>
            <p class="user-info-row"> ${addInfo.fullName} - ${addInfo.telephone} </p>
        </div>
        `;

        infoDiv.id = "address-info";

        let shippingInfoAddress = document.getElementById("shipping-info-address");
        shippingInfoContainer.insertBefore(infoDiv, shippingInfoAddress);
    })
}

displayAddressInfo(addressList)

// Obtain the Payment Method

const displayBookInfo = (toBuyList) => {

    if (toBuyList.length === 1) {
        toBuyList.forEach((bookInfo) => {
            let bookValues = document.createElement("div");
    
            bookValues.innerHTML = `
            <div>
                <p class="one-shipment">1 Shipment</p>
                <p class="arrives">Arrives at your domicile tomorrow</p>
                <div id="img-title-quantity-container">
                    <div id="image-detail">
                    <img src="${bookInfo.image}" alt="${bookInfo.title}" title="${bookInfo.title}" class="mini-img">
                    </div>
                    <div id="title-and-quantity">
                        <p class="title-and-author"><strong>${bookInfo.title}</strong> - ${bookInfo.author}</p>
                        <p class="quantity-and-price">Quantity: ${bookInfo.quantityToBuy} | Price: $${bookInfo.price}</p>
                    </div>    
                </div>
            </div>
            `;
    
            bookValues.id = "review-product";
            reviewProductContainer.appendChild(bookValues);

            const image = bookValues.querySelector('.mini-img');
            image.addEventListener('click', () => {
                showMessageWithImage(bookInfo);
            });
        }) 
    }
    else if (toBuyList.length > 1) {
        toBuyList.forEach((bookInfo) => {
            let bookValues = document.createElement("div");
    
            bookValues.innerHTML = `
            <div id="product-box">
                <div>
                    <img src="${bookInfo.image}" alt="${bookInfo.title}" title="${bookInfo.title}" class="mini-img">
                </div>
                <div>
                    <div id="title-and-quantity">
                        <p class="title-and-author"><strong>${bookInfo.title}</strong> - ${bookInfo.author}</p>
                        <p class="quantity-and-price">Quantity: ${bookInfo.quantityToBuy} | Price: $${bookInfo.price}</p>
                    </div>    
                    <div id="total-price">
                        <p class="total-price">Book Total: <strong>$${bookInfo.total}</strong></p>
                    </div>
                </div>
            </div>    
            `;
    
            bookValues.id = "review-product-box";
            bookValues.style.marginTop = "10px";
            bookValues.style.marginBottom = "0px";
            bookValues.style.borderBottom = "1px solid lightgray";
            reviewProductContainer.appendChild(bookValues);

            const image = bookValues.querySelector('.mini-img');
            image.addEventListener('click', () => {
                showMessageWithImage(bookInfo);
            });
        })
    }
}

displayBookInfo(toBuyList);

// Obtain the Purchase Summary Left
const displayPaymentInfo = (paymentList) => {
    paymentList.forEach((paymentInfo) => {

        const totalPrice = toBuyList.reduce((accumulator, item) => accumulator + parseFloat(item.total), 0);

        let paymentValues = document.createElement("div");

        if (paymentInfo.cryptoType) {
            paymentValues.innerHTML = `
            <div id="crypto-payment-detail-box">
                <div>
                    <img src="${paymentInfo.cryptoLogo}">
                </div>
                <div id="crypto-text-box">
                    <p class="crypto-text">Total to pay in USD: $${totalPrice.toFixed(2)}</p>
                    <p class="crypto-text">${paymentInfo.totalAmount}</p>
                    <p class="crypto-text">${paymentInfo.cryptoAddress}</p>
                    <p class="crypto-text">${paymentInfo.address}</p>
                </div>
                <div>
                    <button type="submit" id="modify-button" class="blue">Modify Payment Method</button>
                </div>
            </div>
            `;
        } else {
            const formattedCardNumber = paymentInfo.cardNumber.match(/.{1,4}/g).join('-');
            const creditOrDebitUpper = `<strong>${paymentInfo.creditOrDebit.toUpperCase()}</strong>`;

            paymentValues.innerHTML = `
            <div id="payment-detail-box">
                <div>
                    <img src="${paymentInfo.cardLogo}">
                </div>
                <div>
                    <p>${creditOrDebitUpper} Card: ${formattedCardNumber}</p>
                </div>
                <div>
                    <button type="submit" id="modify-button" class="blue">Modify Payment Method</button>
                </div>
            </div>
            `;
        }

        paymentValues.id = "payment-detail";
        paymentDetailContainer.appendChild(paymentValues);

        const modifyButton = document.getElementById("modify-button");

        modifyButton.addEventListener("click", () => {
            window.location.href = `../templates/choose-payment.html`;
        });
    });
}

displayPaymentInfo(paymentList);

// Display Purchase Summary

const productImage = document.getElementById('mini-img');
const productTitle = document.getElementById('product-title');
const productPrice = document.getElementById('product-price');
const productQuantity = document.getElementById('product-quantity');
const productShipping = document.getElementById('product-shipping-text');
const productTotal = document.getElementById('product-total');

const displayPurchaseSummary = () => {
    const totalItems = toBuyList.reduce((accumulator, item) => accumulator + parseInt(item.quantityToBuy), 0);
    const totalPrice = toBuyList.reduce((accumulator, item) => accumulator + parseFloat(item.total), 0);

    productQuantity.innerHTML = `Quantity: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp${totalItems}`;
    productTotal.innerHTML = `<strong style="font-size: 20px;">Total: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $${totalPrice.toFixed(2)}</strong>`;
};

displayPurchaseSummary();


// Buttons Events
// Buttons Events
confirmPurchaseButton.addEventListener("click", () => {
    confirmPurchaseButton.textContent = "Your payment is being processed...";

    setTimeout(async () => {
        const now = new Date().toISOString();
        const purchaseId = await makeUniqueId(now);

        const boughtBooks = {
            toBuyList,
            addressList,
            paymentList,
            date: now,
            id: purchaseId
        };

        boughtBooksList.push(boughtBooks);

        localStorage.setItem("boughtBooksList", JSON.stringify(boughtBooksList));

        localStorage.removeItem("toBuyBookList");
        localStorage.removeItem("addressList");
        localStorage.removeItem("paymentList");
        localStorage.removeItem("addedToCartList");

        const findAmountOfPurchasedBooks = (toBuyList) => {
            return toBuyList.map(book => ({ title: book.title, quantityToBuy: book.quantityToBuy }));
        };

        const updateTotalBooks = (listOfBooks, totalPurchased) => {
            return listOfBooks.map(book => {
                const purchasedBook = totalPurchased.find(item => item.title === book.title);
                if (purchasedBook) {
                    book.quantity -= purchasedBook.quantityToBuy;
                }
                return book;
            });
        };

        const totalPurchased = findAmountOfPurchasedBooks(toBuyList);
        const updatedBooks = updateTotalBooks(listOfBooks, totalPurchased);

        localStorage.setItem("listOfBooks", JSON.stringify(updatedBooks));

        window.location.href = `../templates/successful-purchase.html?purchaseId=${encodeURIComponent(purchaseId)}`;
    }, 2600);
});

chooseAnotherAddressButton.addEventListener("click", () => {
    window.location.href = `../templates/residence-form.html`;
});

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
