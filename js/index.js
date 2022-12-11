// URLS
//1. Film
const FILMAPI = 'http://localhost:3000/films'

// 4. Search
const SEARCH = 'http://localhost:3000/films'

document.addEventListener('DOMContentLoaded', () => {

    // ROWS DATA
    const filmRow = document.getElementById('showing-films')
    const searchRow = document.getElementById('search-result')

    // LINKS DATA
    const filmLink = document.getElementById('film-link')
    const homeLink = document.getElementById('home-link')

    // search form
    const searchForm = document.getElementById('search-form')
    const searchInput = document.getElementById('search')

    // CLICK EVENTS FOR LINKS
    filmLink.addEventListener('click', () => {
        // hide film
        filmRow.style.display = "none"
        // hide search page
        searchRow.style.display = "none"
        // show categories
        filmRow.removeAttribute('hidden')

    })

    homeLink.addEventListener('click', () => {
        // hide categories, search and countries
        filmRow.style.display = "flex"
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
        purchaseButton.addEventListener('click', () => {
            alert(capacity)
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
    const createSearchResults = (title, poster, link) => {
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

        const filmLink = document.createElement('a')
        filmLink.classList.add('mt-1', 'mb-2', 'me-3', 'ms-3', 'btn', 'btn-warning')
        filmLink.innerText = 'Purchase ...'
        filmLink.href = link
        filmLink.target = '_blank'

        cardDiv.appendChild(filmImg)
        cardDiv.appendChild(filmTitle)
        cardDiv.appendChild(filmLink)

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
                const filmDataList = data[0]
                const searchResults = filmDataList.map(
                    filmData => {
                        const title = filmData.title
                        const poster = filmData.poster
                        console.log(title)
                        return createSearchResults(title, poster)
                    }
                )
                // replace all children
                searchRow.replaceChildren(...searchResults)
            })
    }

    // load data to UI
    loadFilm()

})
