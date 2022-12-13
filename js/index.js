// URLS
// 1. Film
const FILMAPI = 'http://localhost:3000/films'

const MENU = 'http://localhost:3000/films'

// 2. Search
const SEARCH = 'http://localhost:3000/films/'

    // ROWS DATA
    const filmRow = document.getElementById('showing-films')
    const searchRow = document.getElementById('search-result')
    const filmMenu = document.getElementById('film-menu')
    const searchInput = document.getElementById('search')
 
    const homeLink = document.getElementById('home-link')

    // search form
    const searchForm = document.getElementById('search-form')
    // const searchInput = document.getElementById('search')

    homeLink.addEventListener('click', () => {
        // hide menu, search 
        filmMenu.style.display = "block"
        searchRow.style.display = "none"
        filmRow.style.display = 'block'
        filmRow.removeAttribute('hidden')

    })

    // search form submit listener
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const query = searchInput.value
        searchFilm(query)
        filmRow.style.display = "none"
        filmMenu.style.display = "none"
        searchRow.style.display = "flex"
        searchRow.removeAttribute('hidden')
    })

    // create random film element
    function createFilm (poster, title, runtime, capacity, showtime, tickets_sold, description){

        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card', 'col-12', 'px-0', 'mb-3')
        cardDiv.setAttribute('id', 'filmCardDiv')

        const rowDiv = document.createElement('div')
        rowDiv.classList.add('row')

        const imgDiv = document.createElement('div')
        imgDiv.classList.add('col-6')

        const bodyDiv = document.createElement('div')
        bodyDiv.classList.add('col-6', 'card-body')

        const filmImg = document.createElement('img')
        filmImg.classList.add('card-img', 'h-100')
        filmImg.src = poster
        filmImg.objectFit = 'cover'

        const filmTitle = document.createElement('h2')
        filmTitle.classList.add('card-title')
        filmTitle.innerText = title
        filmTitle.setAttribute('id', 'filmTitle')

        const filmRuntime = document.createElement('h6')
        filmRuntime.classList.add('card-text')
        filmRuntime.innerText = `Runtime: ${runtime} minutes`

        const filmCapacity = document.createElement('h6')
        filmCapacity.classList.add('card-text')
        filmCapacity.innerText = `Capacity: ${capacity}`

        const filmShowtime = document.createElement('h6')
        filmShowtime.classList.add('card-text')
        filmShowtime.innerText = `Showtime: ${showtime}`

        const filmTicketsSold = document.createElement('h6')
        filmTicketsSold.classList.add('card-text')
        filmTicketsSold.innerText = `Availabe Tickets: ${tickets_sold}`

        const filmDescription = document.createElement('p')
        filmDescription.classList.add('card-text')
        filmDescription.innerText = `"${description}"`
        filmDescription.setAttribute('id', 'filmDescription')

        const purchaseButton = document.createElement('button')
        purchaseButton.innerHTML = 'Purchase'
        purchaseButton.setAttribute("id", 'purchase-btn')
        purchaseButton.addEventListener('click', () => {

            let filmTicketsSoldContent = filmTicketsSold.textContent

            if(filmTicketsSoldContent !== `Available Tickets: Sold Out`) {
                let availableTicketsText = filmTicketsSoldContent.split(' ').pop()

                let currentAvailableTickets = Number(availableTicketsText)
                if(currentAvailableTickets === 1) {
                    filmTicketsSold.innerText = `Available Tickets: Sold Out`
                    purchaseButton.innerHTML = `Sold Out`
                } else {
                    let remainingTickets = currentAvailableTickets -1 
                    filmTicketsSold.innerText = `Available Tickets: ${remainingTickets}`
                }
            }
        })

        // append body elements
        bodyDiv.appendChild(filmTitle)
        bodyDiv.appendChild(filmRuntime)
        bodyDiv.appendChild(filmCapacity)
        bodyDiv.appendChild(filmShowtime)
        bodyDiv.appendChild(filmTicketsSold)
        bodyDiv.appendChild(filmDescription)
        bodyDiv.appendChild(purchaseButton)

        // append image elements
        imgDiv.appendChild(filmImg)

        // append divs to row
        rowDiv.appendChild(imgDiv)
        rowDiv.appendChild(bodyDiv)

        // append row to card
        cardDiv.appendChild(rowDiv)

        return cardDiv
    }

    // create search results
    function createSearchResults (title, runtime, capacity, showtime, tickets_sold, description, poster, link) {
        const rootDiv = document.createElement('div')
        rootDiv.classList.add('col-3', 'p-1')

        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card', 'px-0', 'h-100')

        const filmImg = document.createElement('img')
        filmImg.classList.add('card-img-top')
        filmImg.src = poster

        const filmTitle = document.createElement('h6')
        filmTitle.classList.add('p-2')
        filmTitle.innerText = title

        const filmRuntime = document.createElement('h6')
        filmRuntime.classList.add('p-2')
        filmRuntime.innerText = runtime

        const filmCapacity = document.createElement('h6')
        filmCapacity.classList.add('p-2')
        filmCapacity.innerText = capacity

        const filmShowtime = document.createElement('h6')
        filmShowtime.classList.add('p-2')
        filmShowtime.innerText = showtime

        const filmTickets = document.createElement('h6')
        filmTickets.classList.add('p-2')
        filmTickets.innerText = tickets_sold

        const filmDescription = document.createElement('h6')
        filmDescription.classList.add('p-2')
        filmDescription.innerText = description

        const searchLink = document.createElement('a')
        searchLink.classList.add('mt-1', 'mb-2', 'me-3', 'ms-3', 'btn', 'btn-warning')
        searchLink.innerText = 'Purchase ...'
        searchLink.href = link
        searchLink.target = '_blank'

        cardDiv.appendChild(filmImg)
        cardDiv.appendChild(filmTitle)
        cardDiv.appendChild(searchLink)

        rootDiv.appendChild(cardDiv)
        return rootDiv
    }
    function loadOneFilm (film) {
        console.log(film)
         // hide menu, search 
         filmMenu.style.display = "block"
         searchRow.style.display = "none"
         filmRow.style.display = 'block'
         filmMenu.removeAttribute('hidden')
         filmRow.removeAttribute('hidden')
            const titles = film.title
            const runtime = film.runtime
            const capacity = film.capacity
            const showtime = film.showtime
            const ticketsSold = film.tickets_sold
            const description = film.description
            const poster = film.poster
            const filmElement = createFilm(poster, titles, runtime, capacity, showtime, ticketsSold, description)
            filmRow.innerHTML = ""
            filmRow.appendChild(filmElement)
        }

    function createFilmMenu(menu) {
        const rootDiv = document.createElement('div')
        rootDiv.classList.add('col-12', 'p-2')

        const filmData = document.createElement('button')
        filmData.classList.add('col-12', 'p-3')
        filmData.innerText = menu.title
        filmData.setAttribute('id', 'filmMenuBtn')
        filmData.addEventListener('click', () => {
            loadOneFilm(menu)
            console.log(menu)
        })

        rootDiv.appendChild(filmData)
        return rootDiv
    }

    // load film
    function loadFilm() {
        fetch(FILMAPI)
            .then((response) => response.json())
            .then((data) => {
                data.forEach(film => {
                const titles = film.title
                const runtime = film.runtime
                const capacity = film.capacity
                const showtime = film.showtime
                const ticketsSold = film.tickets_sold
                const description = film.description
                const poster = film.poster
                const filmElement = createFilm(poster, titles, runtime, capacity, showtime, ticketsSold, description)
                filmRow.appendChild(filmElement)
                }
            )
        });
    }

    // load countries
    function loadMenu () {
        fetch(MENU)
            .then((response) => response.json())
            .then((data) => {
                const filmElems = data.map(
                    menuData =>  createFilmMenu(menuData)
                )
                filmMenu.append(...filmElems)
            })
    }

    // search data
    function searchFilm (film){
        fetch(`${SEARCH}${film}`)
        .then((response) => response.json())
        .then((data) => {
            const searchResults = data.map(
                filmData => {
                    const title = filmData.title
                    const runtime = filmData.runtime
                    const poster = filmData.poster
                    const capacity = filmData.capacity
                    const showtime = filmData.showtime
                    const tickets = filmData.tickets_sold
                    const description = filmData.description
                    return createSearchResults(title, runtime, capacity, showtime, tickets, description, poster)
                }
            )
                // replace all children
                searchRow.replaceChildren(...searchResults)
            })
    }

// wait for DOM to load to do stuff
document.addEventListener('DOMContentLoaded', (event) => {
    console.log(`Event loaded: ${event.type}`)
    // show filmimages
    fetch(FILMAPI)
    .then(response => response.json())
    .then(data => {
        loadOneFilm(data[0])
    })

    loadMenu()
    
})


// adding new data into the DOM
const addingFilmData = {
        id: "16",
        title: "Scrooge: A Christmas Carol",
        runtime: "96",
        capacity: "30",
        showtime: "01:00PM",
        tickets_sold: "13",
        description: "A supernatural, time-travelling, musical adaptation of Charles Dickens's cult Christmas story.",
        poster: "http://image.tmdb.org/t/p/w500//nOrnzHn9SCF6JTXfX02eSPyAAXL.jpg"
}
const configurationObject = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body:JSON.stringify(addingFilmData),
    }
// fetch(FILMAPI, configurationObject)
//     .then(response => response.json())
//     .then(object => document.innerHTML = object["id"])