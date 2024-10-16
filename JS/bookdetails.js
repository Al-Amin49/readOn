//get the book ID from url
const urlParams = new URLSearchParams(window.location.search);

const bookId = urlParams.get("id");

//load book details data
const loadBookDetails = async (id) => {
  const res = await fetch(`https://gutendex.com/books/${id}`);
  const data = await res.json();
  console.log(data);
  displayBookDetails(data)
};

const displayBookDetails = (book) => {
  const bookDetails = document.getElementById("book-details");
  bookDetails.innerHTML = `
    <div class="book">
                <div class="first-part">
                    <h2>${book.title}</h2>
                    <h2>id :${book.id}</h2>
                </div>
    
                <div class="second-part">
                    <h3>Authors: heloo, kello. jello , kello</h3>
                    <p>Genre: dkldlfd, dfldkjdlfdl, dflkdjfdlfld, dfdljfldd</p>
                </div>
            </div>

            <div>
                <img src="${book.formats["image/jpeg"]}" alt="">
            </div>
    `;
};

loadBookDetails(bookId);
