const API_KEY = '531824c59374ba1968139fa7bcc652dc'
const IMG_URL = 'https://image.tmdb.org/t/p/w300'
const scrollContainer = document.querySelector(".slide");

async function traerPelisDestacadas(media_type='movie',slidenum=0){
    const res = await fetch(`https://api.themoviedb.org/3/trending/${media_type}/day?api_key=${API_KEY}&language=es`)
    const data = await res.json()
    const movies = data.results
    movies.forEach(film => {
        const filmContainer = document.createElement('div')
        const filmImg = document.createElement('img')
        const filmTile = document.createElement('h4')
        const filmDate = document.createElement('div')
        filmContainer.classList.add('slide__peli')
        filmImg.classList.add('slide__peli-img')
        filmImg.setAttribute('src', IMG_URL + film.poster_path)
        filmTile.classList.add('slide__peli-titulo')
        filmTile.innerHTML = film.title
        filmDate.classList.add('slide__peli-date')
        filmDate.innerHTML = film.release_date
        filmContainer.appendChild(filmImg)
        filmContainer.appendChild(filmTile)
        filmContainer.appendChild(filmDate)
        document.getElementsByClassName('slide')[slidenum].appendChild(filmContainer)
        document.getElementsByClassName('slide')[slidenum]
    });
}

traerPelisDestacadas()
scrollContainer.addEventListener("wheel", (evt) => {scrollContainer.scrollLeft += evt.deltaY;});