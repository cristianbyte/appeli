const API_KEY = '531824c59374ba1968139fa7bcc652dc'
const IMG_URL = 'https://image.tmdb.org/t/p/w300'
const scrollContainer = document.querySelector(".slide");

async function consult(search){
    const res = await fetch(`https://api.themoviedb.org/3/${search}?api_key=${API_KEY}&language=es`)
    const data = await res.json()
    return data.results
}

async function traerPelisDestacadas(media_type='movie',slidenum=0){
    const movies = await consult(`trending/${media_type}/day`)

    movies.forEach(film => {
        const filmContainer = document.createElement('a')
        const filmImg = document.createElement('img')
        const filmTile = document.createElement('h4')
        const filmDate = document.createElement('div')

        filmContainer.classList.add('slide__peli')
        filmContainer.setAttribute('href', `#movie=${film.id}`)
        filmImg.classList.add('slide__peli-img')
        filmImg.setAttribute('src', IMG_URL + film.poster_path)
        filmTile.classList.add('slide__peli-titulo')
        filmTile.innerHTML = film.title ?? film.name
        filmDate.classList.add('slide__peli-date')
        filmDate.innerHTML = film.release_date ?? film.first_air_date

        filmContainer.append(filmImg, filmTile, filmDate)
        document.getElementsByClassName('slide')[slidenum].appendChild(filmContainer)
    });
}

scrollContainer.addEventListener("wheel", (evt) => {scrollContainer.scrollLeft += evt.deltaY;});