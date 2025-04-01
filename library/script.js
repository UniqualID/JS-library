const bookContainer = document.querySelector("main")
const newBookBtn = document.querySelector("#add-book")
const cancelBtn = document.querySelector("#cancel")
const dialog = document.querySelector("dialog")
const submit = document.querySelector("#submit")
const form = document.querySelector("#form")

newBookBtn.addEventListener("click", () => dialog.showModal())
cancelBtn.addEventListener("click", () => {
	form.reset()
	dialog.close()
})

// Used copilot to make a way to populate library quickly
// Create the "Add Random Book" button
const randomBookBtn = document.querySelector("#add-random-book")


// Add event listener to the "Add Random Book" button
randomBookBtn.addEventListener("click", () => {
    const randomTitles = ["Random Title 1", "Random Title 2", "Random Title 3"];
    const randomAuthors = ["Author A", "Author B", "Author C"];
    const randomPages = Math.floor(Math.random() * 500) + 1; // Random pages between 1 and 500
    const randomRead = Math.random() > 0.5; // Randomly true or false

    const randomBook = new Book(
        randomTitles[Math.floor(Math.random() * randomTitles.length)],
        randomAuthors[Math.floor(Math.random() * randomAuthors.length)],
        randomPages,
        randomRead
    );

    bookList.push(randomBook);
    drawBookCards();
});

// dialog.showModal()

let bookList = [
	new Book("Stories of Your Life and More", "Ted Chiang", 100, true),
]
drawBookCards()

function Book(title, author, pages, read) {
	if (!new.target) {
		throw Error("You must use the 'new' operator to call the constructor");
	}

	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.id = crypto.randomUUID()
	this.info = function () {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}.`
	}
}

function bookToDiv(book) {
	const divElem = document.createElement("div")
	divElem.classList.add("book")
	if (book.read) {
		divElem.classList.add("isread")
	}

	const titleElem = document.createElement("h3")	
	const authorElem = document.createElement("p")	
	const pagesElem = document.createElement("p")	
	const markReadBtn = document.createElement("button")	
	const removeBtn = document.createElement("button")	

	titleElem.textContent = book.title
	authorElem.textContent = book.author
	pagesElem.textContent = `${book.pages} pages`
	markReadBtn.textContent = book.read ? "Mark Unread" : "Mark Read" 
	removeBtn.textContent = "Remove"

	removeBtn.addEventListener("click", () => {
		bookList = bookList.filter((e) => e.id != book.id)
		drawBookCards()
	})

	markReadBtn.addEventListener("click", () => {
		divElem.classList.toggle("isread")
		book.read = !book.read
		markReadBtn.textContent = book.read ? "Mark Unread" : "Mark Read" 
	})

	divElem.replaceChildren(...[titleElem, authorElem, pagesElem, markReadBtn, removeBtn])
	return divElem
}

function drawBookCards() {
	const bookDivs = bookList.map(bookToDiv)
	bookContainer.replaceChildren(...bookDivs)
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const author = document.querySelector("#author")
	const title = document.querySelector("#title")
	const pages = document.querySelector("#pages")
	const read = document.querySelector("#read")

	console.log(read.value)
	bookList.push(new Book(title.value, author.value, pages.value, read.checked))
	drawBookCards()
	form.reset()
	dialog.close()
	
})