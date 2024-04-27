// RESIDENCE FORM

const toBuyList = JSON.parse(localStorage.getItem("toBuyBookList")) || [];
let addressList = [];

const purchaseSummaryContainer = document.getElementById("purchase-summary-container");
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

// Continue Button 
const continueButton = document.getElementById("continue-button");
continueButton.addEventListener("click", event => {
    event.preventDefault();

    let residenceAddress = document.getElementById("residence-address").value;
    let residenceAddressNumber = document.getElementById("residence-address-number").value;
    let CP = document.getElementById("CP").value;
    let residenceCity = document.getElementById("residence-address-city").value;
    let residenceState = document.getElementById("residence-address-state").value;
    let fullName = document.getElementById("full-name").value;
    let telephone = document.getElementById("telephone").value;

    if (!isNaN(telephone) && telephone.length >= 4) {
        if (!isNaN(CP)) {
            let newAddress = {
                residenceAddress: residenceAddress,
                residenceNumber: residenceAddressNumber,
                residenceCity: residenceCity,
                residenceState: residenceState,
                CP: CP,
                fullName: fullName,
                telephone: telephone
            }

            addressList.push(newAddress);
            
            localStorage.setItem("addressList", JSON.stringify(addressList));

            // Check if toBuyList contains only one type of book
            if (toBuyList.length === 1) {
                const bookToBuy = toBuyList[0];
                window.location.href = `../templates/choose-payment.html?id=${encodeURIComponent(bookToBuy.title)}`;
            } else {
                // Redirect to a page where the user can select the payment method for multiple books
                window.location.href = `../templates/choose-payment.html`;
            }
        } else {
            alert("Invalid Postal Code. Must be a numeric value.");
        }
    } else {
        alert("Invalid Phone. Must be a four-digit number or more.");
    }
});
