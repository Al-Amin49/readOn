

//get the book ID from url
const urlParams = new URLSearchParams(window.location.search);

const bookId = urlParams.get("id");

//load book details data
const loadBookDetails = async (id) => {
    loadingSpinner(true)
  const res = await fetch(`https://gutendex.com/books/${id}`);
  const data = await res.json();
  console.log(data);
  displayBookDetails(data)
  loadingSpinner(false)
};

const displayBookDetails = (book) => {
  const bookDetails = document.getElementById("book-details");
  bookDetails.innerHTML = `
    <div class="book">
                <div class="first-part">
                    <h1>${book.title}</h1>
                    <p><span style="font-weight:bold;">Id: </span> ${book.id}</p>
                </div>
    
                <div class="second-part">
                    <p class=""><span style="font-weight:bold;">Authors: </span> ${book.authors.map(author=>author.name).join(', ')}</p>
                    <p class="genre-text"><span style="font-weight:bold;">Genre:</span> ${book.subjects.join(', ') || 'N/A'}</p>
                </div>
            </div>

            <div>
                <img src="${book.formats["image/jpeg"]}" alt="">
            </div>
    `;
};

//spinner
const loadingSpinner=(isLoading)=>{
    const spinner=document.getElementById("loading-spinner");
    if(isLoading){
        spinner.classList.remove("hidden");
    }
    else{   
        spinner.classList.add("hidden");
    }
}

loadBookDetails(bookId);
