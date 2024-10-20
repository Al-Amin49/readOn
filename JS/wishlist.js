
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
            <h4  >Your wishlist is empty.</h4>
           <a href="index.html"> <button class="btn" style="margin-top:10px;">Back to Home</button> </a>
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
                <button class="remove-btn" >&times;</button>
              </div>
            </div>
            
            
            `;
            wishlistContainer.appendChild(bookElement);
            const removeButton=bookElement.querySelector('.remove-btn');
        removeButton.addEventListener('click', ()=>{
            removeFromWishlist(book.id);
        })

        }
        

    }

const removeFromWishlist=(bookId)=>{
    console.log(bookId);
    wishlist=wishlist.filter(id=>id!==bookId);
    //update wishlist in localstorage
    localStorage.removeItem('wishlist', JSON.stringify(wishlist));
    alert('Book Removed Successfully')

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
    const bookElement=document.querySelector(`.book[data-book-id="${bookId}"]`);