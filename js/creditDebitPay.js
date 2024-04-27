// CREDIT DEBIT PAY

const toBuyList = JSON.parse(localStorage.getItem("toBuyBookList")) || [];

const continueButton = document.getElementById("continue-button");
const changePaymentMethodButton = document.getElementById("change-payment-method-button");
const productQuantity = document.getElementById("product-quantity");
const productTotal = document.getElementById("product-total");

// Display Purchase Summary
const displayPurchaseSummary = () => {
    const totalItems = toBuyList.reduce((accumulator, item) => accumulator + parseInt(item.quantityToBuy), 0);
    const totalPrice = toBuyList.reduce((accumulator, item) => accumulator + parseFloat(item.total), 0);

    productQuantity.innerHTML = `Quantity: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${totalItems}`;
    productTotal.innerHTML = `<strong>Total to pay: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $${totalPrice.toFixed(2)}</strong>`;
};

// Display Purchase Summary initially
displayPurchaseSummary();

// Obtain the book elements
const productTitle = document.getElementById('product-title');
const productShipping = document.getElementById('product-shipping-text');

// Check if bookToBuy exists
if (toBuyList.length > 0) {
    const bookToBuy = toBuyList[0];
    // Update the product details
    productTitle.textContent = bookToBuy.title;
    productShipping.innerHTML = '<strong style="color: rgb(65, 155, 65);">Free Shipping ✔</strong>';
}

// Visa or MasterCard Choosing Logo
const cardTypeSelect = document.getElementById("card-type");
const cardLogo = document.getElementById("card-logo");

cardTypeSelect.addEventListener("change", function() {
    const selectedCardType = cardTypeSelect.value;
    if (selectedCardType === "visa") {
        cardLogo.src = "/img/website/visa.png"
    } else if (selectedCardType === "mastercard") {
        cardLogo.src = "/img/website/master-card.png";
    }
});

// Continue Button
continueButton.addEventListener("click", event => {
    event.preventDefault();

    let cardHolderName = document.getElementById("card-holder-name").value;
    let cardType = document.getElementById("card-type").value;
    let creditOrDebit = document.getElementById("credit-or-debit").value;
    let cardNumber = document.getElementById("card-number").value;
    let expireMM = document.getElementById("expireMM").value;
    let expireYY = document.getElementById("expireYY").value;
    let cvv = document.getElementById("cvv").value;

    // Validation functions...

    let newCard = {
        paymentMethod: "Credit/Debit Card",
        cardHolderName: cardHolderName,
        cardType: cardType,
        creditOrDebit: creditOrDebit,
        cardNumber: cardNumber,
        expireMM: expireMM,
        expireYY: expireYY,
        cardLogo: getCardLogoURL(cardType)
    };

    localStorage.setItem("paymentList", JSON.stringify([newCard]));

    window.location.href = `../templates/review-purchase.html`;
});

// Form Validations
function validateCardNumber(cardNumber) {
    if (isNaN(cardNumber) || cardNumber.length !== 16) {
        return false;
    }
    return true;
}

function validateCVV(cvv) {
    if (isNaN(cvv) || cvv.length !== 3) {
        return false;
    }
    return true;
}

function validateExpirationDate(expireMM, expireYY) {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let inputYear = parseInt("20" + expireYY, 10);
    let inputMonth = parseInt(expireMM, 10);

    if (inputYear > currentYear || (inputYear === currentYear && inputMonth > currentMonth)) {
        return true;
    } else if (inputYear === currentYear && inputMonth === currentMonth) {
        return true;
    } else {
        return false;
    }
}

function getCardLogoURL(cardType) {
    const cardLogoURLs = {
        "visa": "/img/website/visa.png",
        "mastercard": "/img/website/master-card.png",
    };

    return cardLogoURLs[cardType];
}


// Change Payment Button
changePaymentMethodButton.addEventListener("click", () => {
    window.location.href = `../templates/choose-payment.html`;
})
