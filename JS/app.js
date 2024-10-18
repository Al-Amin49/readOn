
let currentBooks=[];
// Fetch books from API
const fetchBooks = async () => {
    loadingSpinner(true)
    const res=await fetch('https://gutendex.com/books');
    const data=await res.json();
    currentBooks=data.results;
    displayBooks(currentBooks)
    // loadin false
    loadingSpinner(false)

};

function displayBooks(books){
    const bookContainer=document.getElementById('book-container');
    //clear previos books
    bookContainer.innerHTML='';  
    //message show if book are not found
    if(books.length===0){
      bookContainer.innerHTML=`
   
   <div class="no-found-container"> 
    <h2 class="no-books">No books found. Please try searching again.</h2>
       <img src="https://shorturl.at/4v2dI" alt="No found image"/>
   </div>
  
      `;
      return;
    }
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

            <a href="bookDetails.html?id=${book.id}" class="btn-container">
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

// search functionality

const searchBtn=document.getElementById("search-button");
console.log(searchBtn, 'search');

searchBtn.addEventListener("click", ()=>{
    const searchTerm=document.getElementById("search-input").value.toLowerCase();
    console.log(searchTerm)
    const filteredBooks=currentBooks.filter(book=>book.title.toLowerCase().includes(searchTerm));
    console.log(filteredBooks)
    displayBooks(filteredBooks)
})
fetchBooks()
