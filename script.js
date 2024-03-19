class Book {
    constructor(title, date, author, pages, read) {
        this.title = title;
        this.date = date;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    markRead() { this.read = true; }
}

const addBookForm = document.querySelector('.inputContainer');
const bookList = document.querySelector('.bookList');

const library = [];

library.push(new Book("The Wonderful Wizard of Oz", "1900-05-17", "L. Frank Baum", 154, false));
library.push(new Book("The Wonderful Wibard of Oz", "1900-05-17", "L. Brank Faum", 154, true));

function onAddBook(event) {
    event.preventDefault();
    let formData = new FormData(addBookForm);
    let title = formData.get("nameInput") === "" ? "Unknown" : formData.get("nameInput");
    let date = formData.get("dateInput") === "" ? "Unknown" : formData.get("dateInput");
    let author = formData.get("authorInput") === "" ? "Unknown" : formData.get("authorInput");
    let pages = formData.get("pagesInput") === "" ? "Unknown" : formData.get("pagesInput");
    let read = formData.get("read") === "Yes" ? true : false;
    let newBook = new Book(title, date, author, pages, read);
    library.push(newBook);
    printBooks();
    addBookForm.reset();
}

function removeBook(event) {
    let button = event.target;
    library.splice(button.id, 1);
    printBooks();
}

function readBook(event) {
    let button = event.target;
    library[button.id].markRead();
    printBooks();
}

function printBooks() {
    bookList.innerHTML = "";
    if (library.length == 0) { bookList.textContent = "Nothing but dust!"; return; }
    const hr = document.createElement("hr");
    bookList.appendChild(hr);
    library.forEach((book, index) => {
        const p = document.createElement('p');
        p.style.whiteSpace = "pre-line";
        p.style.overflowWrap = "break-word";
        p.textContent += "Title: " + book.title + "\r\n";
        p.textContent += "Date: " + book.date + "\r\n";
        p.textContent += "Author: " + book.author + "\r\n";
        p.textContent += "Pages: " + book.pages + "\r\n";
        let isRead = book.read ? "Yes" : "No"
        p.textContent += "Read: " + isRead + "\r\n";
        bookList.append(p);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.style.marginTop = "0.4rem";
        removeButton.id = index;
        removeButton.addEventListener("click", removeBook);
        bookList.appendChild(removeButton);

        if (!book.read)
        {
            const readButton = document.createElement('button');
            readButton.textContent = "Read";
            readButton.style.marginTop = "0.4rem";
            readButton.style.marginLeft = "0.4rem";
            readButton.id = index;
            readButton.addEventListener("click", readBook);
            bookList.appendChild(readButton);
        }

        const newHr = document.createElement("hr");
        bookList.appendChild(newHr);
    })
}

window.addEventListener('load', () => {

    addBookForm.addEventListener('submit', onAddBook);

    // Limit the input of the pages input to numbers above 1 that aren't over 8 characters.
    document.querySelector('#pagesInput').addEventListener('input', (e) => {
        let input = e.target;
        if (input.value != '') { input.value = Math.max(input.value, 1); }
        if (input.value.length > 8) { input.value = input.value.slice(0, 8); }
    })

    printBooks();
})
