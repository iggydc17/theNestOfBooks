// SUCCESSFUL PURCHASE

const boughtBooksList = JSON.parse(localStorage.getItem("boughtBooksList")) || [];
const viewPurchaseDetailsButton = document.getElementById("view-purchase-details-button");

const urlParams = new URLSearchParams(window.location.search);
const purchaseId = urlParams.get('purchaseId');

viewPurchaseDetailsButton.addEventListener("click", () => {
    window.location.href = `../templates/bought-books-detail.html?purchaseId=${encodeURIComponent(purchaseId)}`;
});
