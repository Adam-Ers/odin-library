
function Book(title, date, author, pages, read) {
    this.title = title;
    this.date = date;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const addBookForm = document.querySelector('.inputContainer');
const bookList = document.querySelector('.bookList');

function onAddBook() {
    addBookForm.reset();
}


window.addEventListener('load', () => {

    addBookForm.addEventListener('submit', onAddBook);

    // Limit the input of the pages input to numbers above 1 that aren't over 8 characters.
    document.querySelector('#pagesInput').addEventListener('input', (e) => {
        let input = e.target;
        if (input.value != '') { input.value = Math.max(input.value, 1); }
        if (input.value.length > 8) { input.value = input.value.slice(0, 8); }
    })
})
