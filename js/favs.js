// FAVS

const favsContainer = document.getElementById("favs-container");

const displayFavsBooks = () => {
    favsContainer.innerHTML = "";
    const favoriteBooksListFromStorage = JSON.parse(localStorage.getItem("favoriteBooksList"));

    if (favoriteBooksListFromStorage && favoriteBooksListFromStorage.length > 0) {
        favoriteBooksListFromStorage.forEach((book, index) => {
            const { title, image, price, quantity } = book;

            const newBookDiv = document.createElement("div");
            newBookDiv.classList.add("fav-book");

            let quantityElementContent = "";
            let quantityElementStyle = "";

            if (quantity === 1) {
                quantityElementContent = "Last Available!";
                quantityElementStyle = "color: darkOrange; font-weight: bold;";
            } else if (quantity === 0) {
                quantityElementContent = "Sold Out!";
                quantityElementStyle = "color: darkRed; font-weight: bold;";
            } else {
                quantityElementContent = `Quantity: ${quantity}`;
            }

            newBookDiv.innerHTML = `
                <div id="img-container">
                    <img src="${image}" title="${title}" class="favs-books-img">
                    ${quantity === 0 ? '<div class="favs-sold-out-advertisement">Sold Out</div>' : ''}
                </div>
                <div id="favs-card-text" title="${title}">
                    <div class="favs-title">${title}</div>
                    <div class="favs-price">$${price}</div>
                    <div class="favs-quantity" style="${quantityElementStyle}">${quantityElementContent}</div>
                    <div class="favs-send-announcement">Free Shipping ✔</div>
                    <div>
                        <button type="button" class="delete-button" title="Delete">Delete</button>
                    </div>
                </div>
            `;

            newBookDiv.id = "new-book-div";
            favsContainer.appendChild(newBookDiv);

            // Go to Books Details
            newBookDiv.addEventListener("click", () => {
                window.location.href = `book-detail.html?id=${encodeURIComponent(title)}`;
            });

            // Delete Button
            const deleteButton = newBookDiv.querySelector(".delete-button");
            deleteButton.addEventListener("click", (event) => {
                event.stopPropagation();

                favoriteBooksListFromStorage.splice(index, 1);
                localStorage.setItem("favoriteBooksList", JSON.stringify(favoriteBooksListFromStorage));
                displayFavsBooks();
                toastifyNotifications(`${title} has been removed from the list.`, 'tomato');
            });
        });

        // Clear All Button
        if (!favsContainer.querySelector(".clear-all-button")) {
            const clearAllButton = document.createElement("button");
            clearAllButton.classList.add("clear-all-button");
            clearAllButton.textContent = "Clear All";
            favsContainer.prepend(clearAllButton);

            // SweetAlert2 Library
            clearAllButton.addEventListener("click", () => {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'rgb(65, 155, 65)',
                    cancelButtonColor: 'tomato',
                    confirmButtonText: 'Yes, delete all favorite books!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("favoriteBooksList");
                        displayFavsBooks();
                        Swal.fire(
                            'Deleted!',
                            'All favorite books have been deleted.',
                            'success'
                        );
                    }
                });
            });
        }
    } 
    else {
        let discoverBooksDiv = document.createElement("div");
        discoverBooksDiv.innerHTML = `
        <img src="../img/website/empty-bag.jpg">
        <p class="first-message">Start buying your first book at Library The Nest Of Books!</p>
        <p class="second-message">We handle free shipping ✔</p>
        <button class="button-general" id="discover-books-button">Discover Books!</button>
        `;
    
        discoverBooksDiv.id = "discover-books-container";
        favsContainer.appendChild(discoverBooksDiv);
    
        const discoverBooksButton = document.getElementById("discover-books-button");
        discoverBooksButton.addEventListener("click", () => {
            window.location.href = "../templates/home.html";
        });
    }
}

displayFavsBooks();

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
