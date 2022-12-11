// URLS
// 1. Film
const FILMAPI = 'http://localhost:3000/films'

// 2. Search
const SEARCH = 'http://localhost:3000/films'

let currentVisibleFilm = {}

// function revealfilm(movie) {
//     if(currentVisibleFilm !== undefined){
//         let getPoster = document.getElementById('poster')
//         getPoster.style.display = "none"
//         let getTitle = document.getElementById('title')
//         getTitle.style.display = "none"
//         let getRuntime = document.getElementById('runtime')
//         getRuntime.style.display = "none"
//         let getShowtime = document.getElementById('showtime')
//         getShowtime.style.display = "none"
//         let getCapacity = document.getElementById('capacity')
//         getCapacity.style.display = "none"
//         let getTicketsSold = document.getElementById('tickets_sold')
//         getTicketsSold.style.display = "none"
//         let getDescription = document.getElementById('description')
//         getDescription.style.display = "none"
//     }
//         let getPoster = document.getElementById('poster')
//         getPoster.style.display = "none"
//         let getTitle = document.getElementById('title')
//         getTitle.style.display = "none"
//         let getRuntime = document.getElementById('runtime')
//         getRuntime.style.display = "none"
//         let getShowtime = document.getElementById('showtime')
//         getShowtime.style.display = "block"
//         let getCapacity = document.getElementById('capacity')
//         getCapacity.style.display = "block"
//         let getTicketsSold = document.getElementById('tickets_sold')
//         getTicketsSold.style.display = "block"
//         let getDescription = document.getElementById('description')
//         getDescription.style.display = "block"
//         currentVisibleFilm = movie
// }

    // ROWS DATA
    const filmRow = document.getElementById('showing-films')
    const searchRow = document.getElementById('search-result')

    // LINKS DATA
    const menuLink = document.getElementById('menu-link')
    const homeLink = document.getElementById('home-link')

    // search form
    const searchForm = document.getElementById('search-form')
    const searchInput = document.getElementById('search')

    // CLICK EVENTS FOR LINKS
    menuLink.addEventListener('click', () => {
        // hide film
        filmRow.style.display = "block"
        // hide search page
        searchRow.style.display = "none"
        // show categories
        filmRow.removeAttribute('hidden')

    })

    homeLink.addEventListener('click', () => {
        // hide categories, search and countries
        filmRow.style.display = 'block'
        searchRow.style.display = "none"

    })

    // search form submit listener
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const query = searchInput.value
        searchFilm(query)
        filmRow.style.display = "none"
        searchRow.style.display = "flex"
        searchRow.removeAttribute('hidden')
    })

    // create random film element
    const createFilm = (poster, title, runtime, capacity, showtime, tickets_sold, description) => {

        const cardDiv = document.createElement('div')
        cardDiv.classList.add('card', 'col-12', 'px-0', 'mb-3')

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

        const filmRuntime = document.createElement('h6')
        filmRuntime.classList.add('card-text')
        filmRuntime.innerText = `Runtime: ${runtime}`

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
        filmDescription.innerText = description

        const purchaseButton = document.createElement('button')
        purchaseButton.innerHTML = 'Purchase'
        purchaseButton.setAttribute("id", 'purchase-btn')
        purchaseButton.addEventListener('click', () => {

            let filmTicketsSoldContent = filmTicketsSold.textContent

            if(filmTicketsSoldContent !== `Available Tickets: SOLD OUT`) {
                let availableTicketsText = filmTicketsSoldContent.split(' ').pop()

                let currentAvailableTickets = Number(availableTicketsText)
                if(currentAvailableTickets === 1) {
                    filmTicketsSold.innerText = `Available Tickets: SOLD OUT`
                    purchaseButton.innerHTML = `SOLD OUT`
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

        // return the cardDiv
        return cardDiv
    }

    // create search results
    const createSearchResults = (title, runtime, capacity, showtime, tickets_sold, description, poster, link) => {
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

        const menuLink = document.createElement('a')
        menuLink.classList.add('mt-1', 'mb-2', 'me-3', 'ms-3', 'btn', 'btn-warning')
        menuLink.innerText = 'Purchase ...'
        menuLink.href = link
        menuLink.target = '_blank'

        cardDiv.appendChild(filmImg)
        cardDiv.appendChild(filmTitle)
        cardDiv.appendChild(menuLink)

        rootDiv.appendChild(cardDiv)
        return rootDiv
    }

    // load film
    const loadFilm = () => {
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

    // search data
    const searchFilm = (film) => {
        fetch(`${SEARCH}${film}`)
        .then((response) => response.json())
        .then((data) => {
            // data.forEach(el => {
                
            // })
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
    loadFilm()
})

