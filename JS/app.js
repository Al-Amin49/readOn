
// Fetch books from API
const fetchBooks = async () => {
    const res=await fetch('https://gutendex.com/books');
    const data=await res.json();
    const books=data.results;
    displayBooks(books)

};

function displayBooks(books){
    const bookContainer=document.getElementById('book-container');
    books.forEach(book=>console.log(book.title))
}

fetchBooks()
