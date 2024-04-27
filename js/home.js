// HOME

// Book's Stock

const listOfBooks = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 336, price: 10.99, year: 1960, quantity: 22, image: "../img/To Kill a Mockingbird.jpg", synopsis: "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on Lee's observations of her family, her neighbors and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was 10 years old." },
    { title: "1984", author: "George Orwell", pages: 328, price: 9.79, year: 1949, quantity: 20, image: "../img/1984.jpg", synopsis: "1984 is a dystopian novel by George Orwell published in 1949. The story takes place in an imagined future, where the world is divided into three superstates and ruled by a totalitarian regime. The novel explores themes of government surveillance, propaganda, and individual freedom."},
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", pages: 180, price: 7.99, year: 1925, quantity: 85, image: "../img/The Great Gatsby.jpg",synopsis: "The Great Gatsby is a novel by F. Scott Fitzgerald published in 1925. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan." },
    { title: "Pride and Prejudice", author: "Jane Austen", pages: 279, price: 8.49, year: 1813, quantity: 1, image: "../img/Pride and Prejudice.jpg", synopsis: "Pride and Prejudice is a romantic novel by Jane Austen published in 1813. The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of early 19th-century England." },
    { title: "Moby Dick", author: "Herman Melville", pages: 624, price: 12.99, year: 1851, quantity: 13, image: "../img/Moby Dick.jpg", synopsis: "Moby-Dick; or, The Whale is an 1851 novel by Herman Melville. The story follows Ishmael's experiences on the whale ship Pequod, led by the vengeful Captain Ahab. Ishmael soon learns that Ahab seeks one specific whale: Moby Dick, a ferocious, enigmatic white sperm whale." },
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", pages: 320, price: 11.99, year: 1997, quantity: 7, image: "../img/Harry Potter and the Sorcerer's Stone.jpg",  synopsis: "Harry Potter and the Sorcerer's Stone is a fantasy novel written by British author J.K. Rowling. It is the first novel in the Harry Potter series and Rowling's debut novel. The story follows Harry Potter, a young wizard who discovers his magical heritage as he attends Hogwarts School of Witchcraft and Wizardry."  },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", pages: 224, price: 6.99, year: 1951, quantity: 4, image: "../img/The Catcher in the Rye.jpg",  synopsis: "The Catcher in the Rye is a novel by J.D. Salinger, first published in 1951. It follows Holden Caulfield, a teenager who is expelled from his high school and spends three days wandering around New York City. The novel explores themes of identity, belonging, and alienation." },
    { title: "Animal Farm", author: "George Orwell", pages: 144, price: 7.49, year: 1945, quantity: 55, image: "../img/Animal Farm.jpg", synopsis: "Animal Farm is an allegorical novella by George Orwell, first published in England in 1945. The story uses a group of farm animals who rebel against their human farmer, hoping to create a society where the animals can be equal, free, and happy. However, the rebellion ultimately leads to a totalitarian regime that mirrors the one it overthrew." },
    { title: "Brave New World", author: "Aldous Huxley", pages: 288, price: 8.99, year: 1932, quantity: 0, image: "../img/Brave New World.jpg", synopsis: "Brave New World is a dystopian novel by Aldous Huxley, published in 1932. Set in a futuristic world state where natural reproduction has been eliminated, the novel explores themes of technology, social control, and individuality. It follows the story of Bernard Marx and Lenina Crowne as they navigate a society that values stability and conformity above all else." },
    { title: "Lord of the Flies", author: "William Golding", pages: 224, price: 7.29, year: 1954, quantity: 21, image: "../img/Lord of the Flies.jpg", synopsis: "Lord of the Flies is a novel by William Golding, first published in 1954. The story follows a group of British boys stranded on an uninhabited island, who try to govern themselves with disastrous results. The novel explores themes of human nature, civilization, and the inherent darkness within humanity." },
    { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 304, price: 9.49, year: 1937, quantity: 32, image: "../img/The Hobbit.jpg", synopsis: "The Hobbit, or There and Back Again, is a fantasy novel by J.R.R. Tolkien, published in 1937. It follows the quest of Bilbo Baggins, a hobbit who is hired by the wizard Gandalf and a group of dwarves to reclaim their homeland and treasure from the dragon Smaug. Along the way, Bilbo encounters trolls, elves, goblins, and the mysterious Gollum, and learns that there is more to him than he ever knew." },
    { title: "The Lion, the Witch and The Wardrobe", author: "C.S. Lewis", pages: 767, price: 15.99, year: 1950, quantity: 99, image: "../img/The Lion, The Witch and The Wardrobe.jpg", synopsis: "The Lion, the Witch and the Wardrobe is a fantasy novel by C.S. Lewis, published in 1950. It is the first published and best known of seven novels in The Chronicles of Narnia series. The story revolves around four English children who discover a magical wardrobe that leads to the land of Narnia, where they encounter talking animals, mythical creatures, and a battle between good and evil." },
    { title: "The Alchemist", author: "Paulo Coelho", pages: 208, price: 8.79, year: 1988 , quantity: 0, image: "../img/The Alchemist.jpg", synopsis: "The Alchemist is a novel by Brazilian author Paulo Coelho, first published in 1988. It follows the journey of Santiago, a young Andalusian shepherd boy who dreams of finding treasure in Egypt. Along the way, he encounters a series of characters and experiences that teach him about the importance of following one's dreams and listening to one's heart."},
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 1216, price: 19.99, year: 1954, quantity: 66, image: "../img/The Lord of the Rings.jpg", synopsis: "The Lord of the Rings is an epic high-fantasy novel by J.R.R. Tolkien, published in three volumes in 1954 and 1955. The story follows the quest of the hobbit Frodo Baggins to destroy the One Ring, an object of great power created by the Dark Lord Sauron. Frodo is joined by a fellowship of companions as they journey through Middle-earth to Mount Doom, the only place where the Ring can be destroyed." },
    { title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", pages: 192, price: 5.99, year: 1865, quantity: 3, image: "../img/Alice's Adventures in Wonderland.jpg", synopsis: "Alice's Adventures in Wonderland is a novel written by English author Lewis Carroll, first published in 1865. It tells the story of a young girl named Alice who falls through a rabbit hole into a fantasy world populated by peculiar, anthropomorphic creatures. The tale plays with logic, giving the story lasting popularity with adults as well as with children." },
    { title: "The Picture of Dorian Gray", author: "Oscar Wilde", pages: 254, price: 8.09, year: 1890, quantity: 10, image: "../img/The Picture of Dorian Gray.jpg", synopsis: "The Picture of Dorian Gray is a Gothic and philosophical novel by Oscar Wilde, first published in 1890. The novel tells the story of Dorian Gray, a young man who makes a Faustian bargain to remain forever young while his portrait ages. The novel explores themes of beauty, art, morality, and the consequences of vanity and narcissism." },
    { title: "Frankenstein", author: "Mary Shelley", pages: 280, price: 7.89, year: 1818, quantity: 13, image: "../img/Frankenstein.jpg", synopsis: "Frankenstein; or, The Modern Prometheus is a novel written by English author Mary Shelley, first published in 1818. It tells the story of Victor Frankenstein, a young scientist who creates a grotesque creature in an unorthodox scientific experiment. The novel explores themes of ambition, isolation, nature vs. nurture, and the consequences of unchecked scientific ambition." },
    { title: "The Odyssey", author: "Homer", pages: 432, price: 10.29, year: -800, quantity: 0, image: "../img/The Odyssey.jpg",  synopsis: "The Odyssey is one of two major ancient Greek epic poems attributed to Homer. It is one of the oldest extant works of Western literature, and it has been widely studied for its themes of heroism, adventure, and the journey home. The poem tells the story of Odysseus, king of Ithaca, and his struggles to return home after the Trojan War." },
    { title: "Wuthering Heights", author: "Emily Bronte", pages: 416, price: 9.99, year: 1847, quantity: 30, image: "../img/Wuthering Heights.jpg", synopsis: "Wuthering Heights is a novel by Emily Brontë, published in 1847 under her pseudonym Ellis Bell. It is her only finished novel and is considered one of the greatest works of English literature. The novel tells the story of the passionate and destructive love between Heathcliff and Catherine Earnshaw, and the revenge that Heathcliff seeks on those who wronged him." },
    { title: "Gone with the Wind", author: "Margaret Mitchell", pages: 1024, price: 13.49, year: 1936, quantity: 64, image: "../img/Gone with the Wind.jpg", synopsis: "Gone with the Wind is a novel by American writer Margaret Mitchell, first published in 1936. It tells the story of Scarlett O'Hara, the strong-willed daughter of a Georgia plantation owner, as she navigates life before, during, and after the American Civil War. The novel explores themes of love, survival, and the impact of historical events on individual lives." },
    { title: "A Tale of Two Cities", author: "Charles Dickens", pages: 544, price: 11.49, year: 1859, quantity: 52, image: "../img/A Tale of Two Cities.jpg", synopsis: "A Tale of Two Cities is a historical novel by Charles Dickens, first published in 1859. Set in London and Paris before and during the French Revolution, the novel tells the story of the French Doctor Manette, his 18-year-long imprisonment in the Bastille in Paris and his release to live in London with his daughter Lucie, whom he had never met." },
    { title: "The Secret Garden", author: "Frances Hodgson Burnett", pages: 256, price: 7.69, year: 1911, quantity: 10, image: "../img/The Secret Garden.jpg", synopsis: "The Secret Garden is a novel by Frances Hodgson Burnett, first published in 1911. It tells the story of Mary Lennox, a young girl who is sent to live with her uncle after her parents die in a cholera outbreak in India. Mary discovers a neglected garden on the grounds of her uncle's estate, and through her interactions with the garden and its inhabitants, she undergoes a transformation." },
    { title: "Don Quijote", author: "Miguel de Cervantes", pages: 992, price: 14.99, year: 1605, quantity: 19, image: "../img/Don Quijote.jpg", synopsis: "Don Quijote, fully titled The Ingenious Gentleman Don Quixote of La Mancha, is a novel written by Spanish author Miguel de Cervantes. It was published in two parts, in 1605 and 1615. The novel follows the adventures of Alonso Quixano, a retired country gentleman who becomes obsessed with the chivalrous ideals depicted in books of chivalry, and sets out on a series of misadventures as a self-proclaimed knight-errant named Don Quijote." },
    { title: "Dracula", author: "Bram Stoker", pages: 418, price: 8.39, year: 1897, quantity: 22, image: "../img/Dracula.jpg", synopsis: "Dracula is a Gothic horror novel by Irish author Bram Stoker, first published in 1897. It tells the story of Dracula's attempt to move from Transylvania to England so that he may find new blood and spread the undead curse, and of the battle between Dracula and a small group of people led by Professor Abraham Van Helsing." },
    { title: "Les Miserables", author: "Victor Hugo", pages: 1232, price: 17.99, year: 1862, quantity: 20, image: "../img/Les Miserables.jpg", synopsis: "Les Misérables is a French historical novel by Victor Hugo, first published in 1862. The novel follows the lives and interactions of several characters, focusing on the struggles of ex-convict Jean Valjean and his experience of redemption. The novel explores themes of justice, love, sacrifice, and the human condition." },
    { title: "The Adventures of Huckleberry Finn", author: "Mark Twain", pages: 320, price: 9.29, year: 1884, quantity: 33, image: "../img/The Adventures of Huckleberry Finn.jpg", synopsis: "The Adventures of Huckleberry Finn is a novel by Mark Twain, first published in the United Kingdom in 1884 and in the United States in 1885. It is a direct sequel to Twain's The Adventures of Tom Sawyer. The book is noted for its colorful description of people and places along the Mississippi River, and its satire on the institution of racism and on Southern society in general." }
];

let listOfFavoriteBooks = JSON.parse(localStorage.getItem("favoriteBooksList")) || [];

// Display Books

const booksGrid = document.getElementById("books-grid");

const displayBooksGrid = (listOfBooks) => {
    booksGrid.innerHTML = "";
    listOfBooks.forEach((bookCard) => {
        let newCard = document.createElement("div");

        newCard.innerHTML = `
            <div id="card-img">
                <img src="${bookCard.image}" title="${bookCard.title}">
            </div>
            <div id="card-details">
                ${bookCard.quantity === 0 ? '<div class="sold-out-advertisement">Sold Out</div>' : ''}
                <div class="card-title">${bookCard.title}</div>
                <div id="price-and-favorite">
                    <div class="card-price">$${bookCard.price}</div>
                    <div class="star-symbol">☆</div>
                </div>     
                <div class="send-announcement">Free Shipping ✔</div>
            </div> 
        `;
        
        newCard.id = "new-card";
        booksGrid.appendChild(newCard);

        localStorage.setItem("listOfBooks", JSON.stringify(listOfBooks));

        // Go to Books Details

        newCard.addEventListener("click", (event) => {
            if (!event.target.classList.contains('star-symbol')) {
                window.location.href = `book-detail.html?id=${encodeURIComponent(bookCard.title)}`;
            }
        });
        
        // Stars States

        const starSymbol = newCard.querySelector('.star-symbol');
        starSymbol.addEventListener("click", (event) => {
            event.stopPropagation();
        
            const index = listOfFavoriteBooks.findIndex(fav => fav.title === bookCard.title);
            if (index !== -1) {
                listOfFavoriteBooks.splice(index, 1);
                starSymbol.innerText = "☆";
                toastifyNotifications(`${bookCard.title} has been removed from the favorite books list.`, "tomato");
            } else {
                listOfFavoriteBooks.push(bookCard);
                starSymbol.innerText = "★";
                toastifyNotifications(`${bookCard.title} has been added to the favorite books list.`, "rgb(65, 155, 65)");
            }
            localStorage.setItem("favoriteBooksList", JSON.stringify(listOfFavoriteBooks));
        });

        // Stars Local Storage
    
        document.addEventListener("DOMContentLoaded", () => {
            const starSymbols = document.querySelectorAll('.star-symbol');
        
            starSymbols.forEach(starSymbol => {
                const title = starSymbol.parentElement.parentElement.querySelector('.card-title').textContent;
                const isFavorite = listOfFavoriteBooks.some(fav => fav.title === title);
                
                if (isFavorite) {
                    starSymbol.innerText = "★";
                } else {
                    starSymbol.innerText = "☆";
                }
            });
        });        
        
    });
}

displayBooksGrid(listOfBooks);


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

// Search Book Function and Sorting Options

document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("books-search-form");
    const searchInput = document.getElementById("search-var");
    const sortSelect = document.getElementById("sort-options");
    const searchButton = document.getElementById("search-button");
    const booksGrid = document.getElementById("books-grid"); 
    let backButtonCreated = false;

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const searchTerm = searchInput.value.toLowerCase();
        const sortOption = sortSelect.value;

        let filteredBooks = listOfBooks.filter(book => {
            const searchMatch = book.title.toLowerCase().includes(searchTerm) ||
                                book.author.toLowerCase().includes(searchTerm) ||
                                book.year.toString().includes(searchTerm);
            if (!searchTerm || searchMatch) {
                return book;
            }
        });

        switch (sortOption) {
            case "A - Z":
                filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "Z - A":
                filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "Recent Year":
                filteredBooks.sort((a, b) => b.year - a.year);
                break;
            case "Ancient Year":
                filteredBooks.sort((a, b) => a.year - b.year);
                break;
            case "Lower Price":
                filteredBooks.sort((a, b) => a.price - b.price);
                break;
            case "Higher Price":
                filteredBooks.sort((a, b) => b.price - a.price);
                break;
            case "Available":
                filteredBooks = filteredBooks.filter(book => book.quantity > 0);
                break;
            case "Sold Out":
                filteredBooks = filteredBooks.filter(book => book.quantity === 0);
                break;
            default:
                displayBooksGrid(listOfBooks);
                break;
        }

        if (filteredBooks.length > 0) {
            displayBooksGrid(filteredBooks);
        } else {
            const noResultsMessageContainer = document.createElement("div");
            noResultsMessageContainer.classList.add("no-results-message");

            noResultsMessageContainer.innerHTML = `
            <div id="no-results-box">
                <h2>There are no books that match your search.</h2>
                <ul>
                    <li><strong>Check the spelling</strong> of the words.</li>
                    <li>Try using <strong>more specific words</strong>, or try fewer words.</li>
                    <li>If you are looking for a book and it does not exist, <a href="suggestBooksSection.html">Suggest us a Book</a>.</li>
                    <li>If you have any other questions, <a href="contact.html">Contact Us</a>.</li>
                </ul> 
            </div>
            `;

            booksGrid.style.width = "141vh";
            booksGrid.id = "no-results-message-container";
            booksGrid.innerHTML = ""; 
            booksGrid.appendChild(noResultsMessageContainer); 
        }
    });

    searchButton.addEventListener("click", function() {
        if (!backButtonCreated) {
            let backButton = document.createElement("button");
            
            booksGrid.removeAttribute("style");
            booksGrid.id = "books-grid";
            
            backButton.textContent = "←";
            backButton.id = "back-button";
            searchForm.prepend(backButton);

            backButtonCreated = true;

            backButton.addEventListener("click", function() {
                searchForm.removeChild(backButton);
            
                booksGrid.removeAttribute("style");
                booksGrid.id = "books-grid";
            
                displayBooksGrid(listOfBooks);
            
                backButtonCreated = false;
                searchInput.value = "";
                sortSelect.value = "default";
            });
        }
    });
});
