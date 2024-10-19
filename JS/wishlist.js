
//wait for the html document to be fully loaded

document.addEventListener('DOMContentLoaded', ()=>{
    //wishlist container

    const wishlistContainer=document.getElementById('wishlist-container');
    //load books from local storage
    let wishlist=JSON.parse(localStorage.getItem('wishlist')) ||[];

    //if wishlist is empty
    if(wishlist.length===0){
        wishlistContainer.innerHTML=`
        <div class="empty-container">
            <h2>Your wishlist is empty.</h2>
            <button>Back to Home</button>
        </div>
        `;
        return;
    }

    const fetchListBooks=async()=>{
        loadingSpinner(true);
        const books=[];
        for(let id of wishlist){
            const res=await fetch(`https://gutendex.com/books/${id}`);
            const data=await res.json();
            books.push(data);
            console.log('books', books);
            loadingSpinner(false);
            displayWishListBooks(books)
        }
    }
    const displayWishListBooks=(books)=>{
        wishlistContainer.innerHTML='';
        for(let book of books){
            const bookElement=document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML=`
            <div class="book-info">
            <img src="${book.formats['image/jpeg']}" alt="">
              <div>
                <h3>${book.title}</h3>
                <p>Id: ${book.id}</p>
                <button class="remove-btn" onclick="removeBook(${book.id})">&times;</button>
              </div>
            </div>
            
            
            `;
            wishlistContainer.appendChild(bookElement);
        }

    }
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
    fetchListBooks()
})