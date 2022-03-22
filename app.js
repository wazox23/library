class Book {
    constructor(title, author, pages, checkbox){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.checkbox = checkbox;
    }
}

let books = JSON.parse(window.localStorage.getItem("books")) || [];
const form = document.querySelector("#form")
const title = document.querySelector("#title")
const author= document.querySelector("#author")
const pages = document.querySelector("#pages")
const checkbox = document.querySelector("#checkbox")
const addNewBook = document.getElementById("addNewBook")


addNewBook.addEventListener("click", (event) => {
    event.preventDefault();
    addBook(event);
    displayBooks()
    saveOnLocalStorage();
    
    
    
    
})

displayBooks();
function addBook(event) {
    const book = new Book (title.value, author.value, pages.value, checkbox.value)
    books.push(book);

    title.value = "";
    author.value = "";
    pages.value = "";
    checkbox.checked = false;

    saveOnLocalStorage();
    
}

function saveOnLocalStorage(){
    window.localStorage.setItem("books", JSON.stringify(books));
}
function displayBooks(){
    books = JSON.parse(window.localStorage.getItem('books'));
    document.querySelector('#bookshelf').innerHTML = '';
  
    books.forEach((book, index, bookList) => {
      const li = document.createElement('li');
      li.classList.add('bookItem');
      if(book.checkbox){
        li.classList.add('checked');
      }
  
      const bookTitle = document.createElement('span');
      bookTitle.classList.add('bookTitle', 'bk')
      bookTitle.innerText = 'Title: ' + book.title; 
  
      const bookAuthor = document.createElement('span');
      bookAuthor.classList.add('bookAuthor', 'bk');
      bookAuthor.innerText = 'Author: ' + book.author;
  
      const bookPages = document.createElement('span');
      bookPages.classList.add('bookPages', 'bk');
      bookPages.innerText = 'Pages: ' + book.pages;
  
      const isRead = document.createElement('input');
      isRead.type = 'checkbox';
      isRead.checked = book.checkbox;
      isRead.addEventListener('change', () => {
          bookList[index].checkbox = !bookList[index].checkbox;
          saveOnLocalStorage();
        });
        
        
     
  
      const deleteButton = document.createElement('button');
      
      deleteButton.classList.add('deleteButton');
      deleteButton.innerText = 'Remove';
      deleteButton.addEventListener('click', () => {
        books.splice(index, 1);
        saveOnLocalStorage();
        displayBooks();
        
        
      });
  
      li.append(bookTitle, bookAuthor, bookPages, isRead, deleteButton); 
      document.querySelector('#bookshelf').appendChild(li);
    });
  };
  
  if(books.length > 0) displayBooks();