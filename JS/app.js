
let currentBooks=[];
// Fetch books from API
const fetchBooks = async () => {
    loadingSpinner(true)
    const res=await fetch('https://gutendex.com/books');
    const data=await res.json();
    currentBooks=data.results;
    //get saved search and filter

    applySavedPreferences()

    if (!localStorage.getItem('searchTerm') && !localStorage.getItem('selectedGenre')) {
      displayBooks(currentBooks);
    }

    //update the wishlist icons
    updateWishListIcons();
    updateCartCount();
    
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
               <i 
               class="fa-regular fa-heart love-icon" 
               data-book-id="${book.id}"
               style=" cursor: pointer; color:green;"
               onclick="handleLoveIconClick(this)" 
               >
               </i>

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
    localStorage.setItem("searchTerm", searchTerm);
    const filteredBooks=currentBooks.filter(book=>book.title.toLowerCase().includes(searchTerm));
    displayBooks(filteredBooks)
})

//genre filter

const genreFilter=document.getElementById("genre-filter");
genreFilter.addEventListener("change", ()=>{
    const selectedGenre=genreFilter.value;
    localStorage.setItem("selectedGenre", selectedGenre);
    if (selectedGenre === "") {
      displayBooks(currentBooks);
  } else {
      const filteredBooks = currentBooks.filter(book =>
          book.subjects.includes(selectedGenre)
      );
      displayBooks(filteredBooks);
  }
})

//apply saved preference from localstorage on page load

const applySavedPreferences=()=>{
  const savedSearchTerm=localStorage.getItem('searchTerm');
  const savedGenre=localStorage.getItem('selectedGenre');
  if(savedSearchTerm){
    document.getElementById("search-input").value=savedSearchTerm;
    const filteredBooks=currentBooks.filter(book=>book.title.toLowerCase().includes(savedSearchTerm));
    displayBooks(filteredBooks);
  }

  if(savedGenre){
    genreFilter.value=savedGenre;
    const filteredBooks=currentBooks.filter(book=>book.subjects.includes(savedGenre));
    displayBooks(filteredBooks);
  }

}
// handle whishtlist
let wishList= JSON.parse(localStorage.getItem('wishlist')) || [];
const handleLoveIconClick=(icon)=>{
  const bookId=icon.getAttribute('data-book-id');
  
  if(wishList.includes(bookId)){
    //Remove from wishlist
    wishList=wishList.filter(id=>id!==bookId);
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');

    //alert
      alert('Book removed from wishlist')
  }
  else{
    //add to wishlist
    wishList.push(bookId);
    icon.classList.add('fa-solid');
    icon.classList.remove('fa-regular');
   
//alert
alert('Book added to wishlist')
  }
  console.log(wishList);
  //save the wishlist to localstoreage
  localStorage.setItem('wishlist', JSON.stringify(wishList));
 
  //update cart count
  updateCartCount();
  
}

//cart count update

const updateCartCount=()=>{
  const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = wishList.length;
    console.log(cartCountElement)
}

//update wishlist icons
const updateWishListIcons = () => {
  document.querySelectorAll('.love-icon').forEach(icon => {
    const bookId = icon.getAttribute('data-book-id');
    if (wishList.includes(bookId)) {
      // Set to solid heart if the book is in the wishlist
      icon.classList.add('fa-solid');
      icon.classList.remove('fa-regular');
    } else {
      // Set to regular heart if the book is not in the wishlist
      icon.classList.add('fa-regular');
      icon.classList.remove('fa-solid');
    }
  });
};


fetchBooks()
