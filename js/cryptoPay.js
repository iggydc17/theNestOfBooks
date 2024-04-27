// CRYPTO PAY

const toBuyList = JSON.parse(localStorage.getItem("toBuyBookList")) || [];
let paymentList = JSON.parse(localStorage.getItem("paymentList")) || [];

const purchaseSummaryContainer = document.getElementById("purchase-summary-container");
const productQuantity = document.getElementById("product-quantity");
const productTotal = document.getElementById("product-total");

// Display Purchase Summary
const displayPurchaseSummary = () => {
    const totalItems = toBuyList.reduce((accumulator, item) => accumulator + parseInt(item.quantityToBuy), 0);
    const totalPrice = toBuyList.reduce((accumulator, item) => accumulator + parseFloat(item.total), 0);

    const productQuantity = document.getElementById('product-quantity');
    const productTotal = document.getElementById('product-total');

    productQuantity.innerHTML = `Quantity: ${totalItems}`;
    productTotal.innerHTML = `<strong>Total to pay in USD: $${totalPrice.toFixed(2)}</strong>`;
};

displayPurchaseSummary();

// Bitcoin API
const fetchBitcoinPrice = async () => {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        const data = await response.json();
        return data.bitcoin.usd;
    } catch (error) {
        console.error('Error fetching Bitcoin price:', error);
        return null;
    }
};

// USDT API
const fetchUSDTPrice = async () => {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd");
        const data = await response.json();
        return data.tether.usd;
    } catch (error) {
        console.error('Error fetching USDT price:', error);
        return null;
    }
};

// Choose Crypto Type Payment
const updatePaymentDetails = async (selectedCryptoType) => {
    paymentList = [];

    const cryptoPriceElement = document.getElementById("crypto-price");
    const totalToPayElement = document.getElementById("total-to-pay");
    const totalToPay = toBuyList.reduce((accumulator, item) => accumulator + parseFloat(item.total), 0); 
    const totalAmount = document.getElementById("total-amount");
    const qrImg = document.getElementById("qr-img");
    const cryptoAddress = document.getElementById("crypto-address");
    const address = document.getElementById("address");
    const alertAddressMessage = document.getElementById("alert-address-message");

    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('id');

    const bookToBuy = toBuyList.find((book) => book.title === bookId);

    if (selectedCryptoType === "USDT") {
        const usdtPrice = await fetchUSDTPrice();
        if (usdtPrice) {
            cryptoPriceElement.innerHTML = `1 USDT = <a href="https://www.coingecko.com/en/coins/tether" target="_blank"><strong>$${usdtPrice}</strong></a>`;
            totalToPayElement.innerHTML = `Price to pay in USD: <strong>$${totalToPay.toFixed(2)}</strong>`;
            totalAmount.innerHTML = `Total to pay USDT: <strong>${(totalToPay / usdtPrice).toFixed(2)} USDT</strong>`;
        } else {
            console.error('Error fetching USDT price');
        }

        qrImg.src = "../img/website/usdt-qr.jpg";
        cryptoAddress.innerHTML = "TYyLZKCh4nKu69Ds3t5EhXjBKAABTfAJug";
        address.innerHTML = "Network: <strong>TRX Tron (TRC20)</strong>";
        alertAddressMessage.innerHTML = `
            <p>Please be aware that funds sent to the wrong network may not be recoverable. Before making any transaction, ensure to carefully verify the destination address and corresponding blockchain network.</p>
            <p>Sending USDT to the wrong network can result in the permanent loss of your funds. Always make sure to use the correct address and network before confirming any transaction.</p>
            <p>Remember: caution is key in the world of cryptocurrencies. Double-check before sending your funds and keep your assets secure at all times.</p>
        `;
        alertAddressMessage.classList.add("alert-message");
    } else if (selectedCryptoType === "bitcoin") {
        const btcPrice = await fetchBitcoinPrice();
        if (btcPrice) {
            cryptoPriceElement.innerHTML = `1 BTC = <a href="https://www.coingecko.com/en/coins/bitcoin" target="_blank"><strong>$${btcPrice}</strong></a>`;
            totalToPayElement.innerHTML = `Price to pay in USD: <strong>$${totalToPay.toFixed(2)}</strong>`;
            totalAmount.innerHTML = `Total to pay in BTC: <strong>${(totalToPay / btcPrice).toFixed(7)} BTC</strong>`;
        } else {
            console.error('Error fetching BTC price');
        }

        qrImg.src = "../img/website/btc-qr.png";
        cryptoAddress.innerHTML =  `18Bb4YLkSMKAP5XgTsV6TBcLDEwnQGrCg1`;
        address.innerHTML = "Network: <strong>BTC (Bitcoin)</strong>";
        alertAddressMessage.innerHTML = `
            <p>Please be aware that funds sent to the wrong network may not be recoverable. Before making any transaction, ensure to carefully verify the destination address and corresponding blockchain network.</p>
            <p>Sending Bitcoin to the wrong network can result in the permanent loss of your funds. Always make sure to use the correct address and network before confirming any transaction.</p>
            <p>Remember: caution is key in the world of cryptocurrencies. Double-check before sending your funds and keep your assets secure at all times.</p>
        `;
    }

        
    // Add the payment details to paymentList
    let newCryptoPayment = {
        cryptoType: selectedCryptoType,
        totalToPay: totalToPay,
        totalAmount: totalAmount.innerHTML,
        qrImgSrc: qrImg.src,
        cryptoAddress: cryptoAddress.innerHTML,
        address: address.innerHTML,
        alertAddressMessage: alertAddressMessage.innerHTML,
        cryptoLogo: getCryptoLogoURL(selectedCryptoType),
    };

    paymentList.push(newCryptoPayment);
    localStorage.setItem("paymentList", JSON.stringify(paymentList));
}

const getCryptoLogoURL = (selectedCardType) => {
    const cryptoLogoURL = {
        "bitcoin": "/img/website/btc.png",
        "USDT": "/img/website/usdt.png",
    };

    return cryptoLogoURL[selectedCardType];
}

const cryptoType = document.getElementById("crypto-type");
cryptoType.addEventListener("change", () => {
    updatePaymentDetails(cryptoType.value);
});

updatePaymentDetails(cryptoType.value);

// Continue Button and change Payment Method Button
const continueButton = document.getElementById("continue-button");
const changePaymentMethodButton = document.getElementById("change-payment-method-button");

continueButton.addEventListener("click", () => {
    window.location.href = `../templates/review-purchase.html`;
})

changePaymentMethodButton.addEventListener("click", () => {
    window.location.href = `../templates/choose-payment.html`;
})


// Copy Button
const copyButton = document.querySelector(".bi.bi-files");

copyButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const cryptoAddress = document.getElementById("crypto-address");
    const addressText = cryptoAddress.innerText;

    const textarea = document.createElement("textarea");
    textarea.value = addressText;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");

    document.body.removeChild(textarea);

    copyButton.classList.remove("bi-files");
    copyButton.classList.remove("bi-check");
    copyButton.innerText = "✔";
    copyButton.style.color = "rgb(65, 155, 65)";
    copyButton.style.fontWeight = "bold";
    copyButton.style.fontSize = "18px";
    copyButton.style.marginLeft = "12px";

    toastifyNotifications(`Address copied: ${addressText}`, "rgb(65, 155, 65)");

});

// SweetAlert 2 Library

const messageQrImg = () => {
    let qrImageSrc = "";
    let paymentAddress = "";
    let network = ""; 

    if (cryptoType.value === "USDT") {
        qrImageSrc = "/img/website/usdt-qr.jpg";
        paymentAddress = "TYyLZKCh4nKu69Ds3t5EhXjBKAABTfAJug";
        network = "TRX Tron (TRC20)";
    } else if (cryptoType.value === "bitcoin") {
        qrImageSrc = "/img/website/btc-qr.png";
        paymentAddress = "18Bb4YLkSMKAP5XgTsV6TBcLDEwnQGrCg1";
        network = "BTC (Bitcoin)"; 
    }

    Swal.fire({
        title: `Network: ${network}`,
        text: `Address: ${paymentAddress}`,
        imageUrl: qrImageSrc,
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: `QR Code for ${network} Payment`, 
    });
};

const qrAndAddressContainer = document.getElementById("qr-and-address-container");
qrAndAddressContainer.addEventListener("click", messageQrImg);

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
