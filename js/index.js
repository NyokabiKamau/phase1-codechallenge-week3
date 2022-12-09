const filmAPI = 'db.json'

document.addEventListener('DOMContentLoaded', () => {

    // ROW DATA
    const filmtitle = document.getElementById('title')
    const filmRuntime = document.getElementById('runtime')
    const filmCapacity = document.getElementById('capacity')
    const filmTicketsSold = document.getElementById('tickets_sold')
    const filmDescription = document.getElementById('description')

    // CLICK EVENTS
})

const loadFilms = () => {
    fetch(filmAPI).then((response) => response.json())
        .then((data) => {

        })
}

// {
//     "id": "1",
//     "title": "The Giant Gila Monster",
//     "runtime": "108",
//     "capacity": 30,
//     "showtime": "04:00PM",
//     "tickets_sold": 27,
//     "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
//     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
//   },