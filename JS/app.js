
// Fetch books from API
const fetchBooks = async () => {
    loadingSpinner(true)
    const res=await fetch('https://gutendex.com/books');
    const data=await res.json();
    const books=data.results;
    displayBooks(books)
    // loadin false
    loadingSpinner(false)

};

function displayBooks(books){
    const bookContainer=document.getElementById('book-container');
    books.forEach(book=>{
        const bookDiv=document.createElement('div');
        bookDiv.classList.add('card');
        bookDiv.innerHTML=`
        <div class="card">
          <div class="image-container"">
            <img
              src="${book.formats["image/jpeg"]}"
              alt="book"
              class="card-image"
            />
             
          </div>
          <div class="card-content">
           
               <div class="title-container">
               <h4 class="card-title">${book.title}</h4>
               <i class="fa-regular fa-heart love-icon" style=" cursor: pointer; color:green;"></i>

               </div>
            
               <p class="id" ><span style="font-weight:bold;">Id: </span>${book.id}</p>
            <p class="authors-name">
              <span style="font-weight:bold;">Authors: </span>${book.authors.map(author=>author.name).join(', ')}
            </p>
            <p class="genre" ><span style="font-weight:bold;">Genre:</span>${book.subjects.join(', ') || 'N/A'}book</p>

            <a href="" class="btn-container">
              <button class="btn">Show Details</button>
            </a>
          </div>
        </div>
        
        `
        bookContainer.appendChild(bookDiv);
    })
}

//loading spiner
const loadingSpinner=(isLoading)=>{
    const spinner=document.getElementById("loading-spinner");
    if(isLoading){
        spinner.classList.remove("hidden");
    }
    else{   
        spinner.classList.add("hidden");
    }
    

}
fetchBooks()
