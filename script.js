
function Book(title, date, author, pages, read) {
    this.title = title;
    this.date = date;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const addBookForm = document.querySelector('.inputContainer');
const bookList = document.querySelector('.bookList');

const library = [];

library.push(new Book("The Wonderful Wizard of Oz", "05/17/1990", "L. Frank Baum", 154, false));
library.push(new Book("The Wonderful Wibard of Oz", "05/17/1990", "L. Brank Faum", 154, false));
library.push(new Book("The Wonderful Wizard of Oz", "05/17/1990", "L. Frank Baum", 154, false));
library.push(new Book("The Wonderful Wizard of Oz", "05/17/1990", "L. Frank Baum", 154, false));

function onAddBook() {
    addBookForm.reset();
}

function removeBook(event) {
    let button = event.target;
    library.splice(button.id, 1);
    printBooks();
}

function printBooks() {
    bookList.innerHTML = "";    
    const hr = document.createElement("hr");
    bookList.appendChild(hr);
    library.forEach((book, index) => {
        const p = document.createElement('p');
        p.style.whiteSpace = "pre";
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
