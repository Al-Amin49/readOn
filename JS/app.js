const apiUrl = 'https://gutendex.com/books';
let books = [];


// Fetch books from API
const fetchBooks = async () => {
    try {
        const response = await fetch(apiUrl);
        console.log('response', response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('data', data);
        books = data.results; 
        console.log('Books fetched successfully:', books);
        
    } catch (error) {
        console.error('Error fetching books:', error);
    }
};

fetchBooks()
