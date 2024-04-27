const suggestBookContainer = document.getElementById("suggest-books-container");
const suggestTableContainer = document.getElementById("suggest-table-container");
const suggestBookButton = document.getElementById("suggest-book-button");
const emptyMessage = document.getElementById("empty-message");

let suggestBookList = [];

emptyMessage.style.display = "block";
suggestTableContainer.style.display = "none";

const toastifyNotifications = (message, backgroundColor) => {
    Toastify({
        text: message,
        className: "info",
        style: {
            background: backgroundColor,
            borderRadius: "4px"
        },
        duration: 3000
    }).showToast();
}

suggestBookButton.addEventListener("click", event => {
    event.preventDefault();

    let suggestBookName, suggestBookAuthor, suggestBookYear;

    suggestBookName = document.getElementById("suggest-book-name").value.trim();
    suggestBookAuthor = document.getElementById("suggest-book-author").value.trim();
    suggestBookYear = document.getElementById("suggest-book-year").value.trim();
    
    if (suggestBookName === "" || suggestBookAuthor === "" || suggestBookYear === "") {
        toastifyNotifications("Please complete all mandatory fields: title, author's name, and year.", "tomato")
    }
    else if (!isNaN(suggestBookAuthor)) {
        toastifyNotifications("Please enter a valid name.", "tomato")
    }
    else if (isNaN(suggestBookYear)) {
        toastifyNotifications("Please enter a four-digit valid number for the year.", "tomato")
    }
    else {
        let newSuggestBook = {
            title: suggestBookName,
            author: suggestBookAuthor,
            year: suggestBookYear
        }

        suggestBookList.push(newSuggestBook);
        localStorage.setItem("suggestBookList", JSON.stringify(suggestBookList));
        displayNewSuggestBook(suggestBookList);

        toastifyNotifications("The new suggested book has been added successfully!", "rgb(65, 155, 65)");

        emptyMessage.style.display = "none";
        suggestTableContainer.style.display = "block";

        document.getElementById("suggest-book-name").value = "";
        document.getElementById("suggest-book-author").value = "";
        document.getElementById("suggest-book-year").value = "";
    }
});

displayNewSuggestBook = (newBooks) => {
    let suggestBookTable = document.getElementById("suggest-book-table");
    suggestBookTable.innerHTML = ""; 
    newBooks.forEach((book) => {
        let newBookRow = document.createElement("tr");

        newBookRow.innerHTML = `
            <td class="content-table title">${book.title}</td>             
            <td class="content-table">${book.author}</td>             
            <td class="content-table">${book.year}</td>
        `;

        suggestBookTable.appendChild(newBookRow);
    });
}

window.addEventListener("load", () => {
    const storedSuggestBookList = JSON.parse(localStorage.getItem('suggestBookList'));

    if (storedSuggestBookList) {
        suggestBookList = storedSuggestBookList;
        displayNewSuggestBook(suggestBookList);
        emptyMessage.style.display = "none";
        suggestTableContainer.style.display = "block";
    }
});
