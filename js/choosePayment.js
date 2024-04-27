// CHOOSE PAYMENT

const toBuyList = JSON.parse(localStorage.getItem("toBuyBookList")) || [];

const continueButton = document.getElementById("continue-button");
const productQuantity = document.getElementById("product-quantity");
const productTotal = document.getElementById("product-total");

// Display Purchase Summary
const displayPurchaseSummary = () => {
    const totalItems = toBuyList.reduce((accumulator, item) => accumulator + parseInt(item.quantityToBuy), 0);
    const totalPrice = toBuyList.reduce((accumulator, item) => accumulator + parseFloat(item.total), 0);

    productQuantity.innerHTML = `Quantity: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp${totalItems}`;
    productTotal.innerHTML = `<strong style="font-size: 20px;">Total: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $${totalPrice.toFixed(2)}</strong>`;
};

// Display Purchase Summary initially
displayPurchaseSummary();


// Radio Input Selection
let selectedPaymentMethod = "";
const radioCreditDebit = document.getElementById("radio-credit-debit");
const radioCrypto = document.getElementById("radio-crypto");
const creditDebitOption = document.getElementById("credit-debit-option");
const cryptoOption = document.getElementById("crypto-option");

creditDebitOption.addEventListener("click", () => {
    radioCreditDebit.checked = true;
    radioCrypto.checked = false;
});

cryptoOption.addEventListener("click", () => {
    radioCreditDebit.checked = false;
    radioCrypto.checked = true;
});

// Continue Button
continueButton.addEventListener("click", () => {
    if (radioCreditDebit.checked) {
        handlePayment("credit-debit-pay.html");
    } else if (radioCrypto.checked) {
        handlePayment("crypto-pay.html");
    } else {
        alert("Please select a payment method.");
    }
});

function handlePayment(paymentPage) {
    // Check if toBuyList contains only one type of book
    if (toBuyList.length === 1) {
        const bookToBuy = toBuyList[0];
        window.location.href = `../templates/${paymentPage}?id=${encodeURIComponent(bookToBuy.title)}`;
    } else {
        // Redirect to a page where the user can select the payment method for multiple books
        window.location.href = `../templates/${paymentPage}`;
    }
}