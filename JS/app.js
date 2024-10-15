
// Fetch books from API
const fetchBooks = async () => {
    const res=await fetch('https://gutendex.com/books');
    const data=await res.json();
    const books=data.results;
    displayBooks(books)

};

function displayBooks(books){
    const bookContainer=document.getElementById('book-container');
    books.forEach(book=>{
        const bookDiv=document.createElement('div');
        bookDiv.classList.add('card');
        bookDiv.innerHTML=`
        <div class="card">
          <img
            src="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg"
            alt="book"
            class="card-image"
          />
          <div class="card-content">
            <div class="title-container">
              <h4 class="card-title">${book.title}</h4>
              <p >Id:${book.id}</p>
            </div>
            <p class="authors-name">
              Lorem ipsum dolor sit, amet consectetur a.
            </p>
            <p class="genre">Genre: book</p>

            <a href="">
              <button class="btn">Show Details</button>
            </a>
          </div>
        </div>
        
        `
        bookContainer.appendChild(bookDiv);
    })
}

fetchBooks()
