const API_KEY = '531824c59374ba1968139fa7bcc652dc'
const IMG_URL = 'https://image.tmdb.org/t/p/w300'
const scrollContainer = document.querySelector(".slide");
const load = document.querySelector('.load')

async function consult(search){
    load.classList.add('loanding')
    const res = await fetch(`https://api.themoviedb.org/3/${search}?api_key=${API_KEY}&language=es`)
    const data = await res.json()
    load.classList.remove('loanding')
    return data.results ?? data
}

async function traerPelisDestacadas(media_type='movie',slidenum=0){
    const movies = await consult(`trending/${media_type}/day`)
    
    movies.forEach(film => {
        const filmContainer = document.createElement('a')
        const filmImg = document.createElement('img')
        const filmTile = document.createElement('h4')
        const filmDate = document.createElement('div')
        
        filmContainer.classList.add('slide__peli')
        filmContainer.setAttribute('href', `#${media_type}=${film.id}`)
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

traerPelisDestacadas()
traerPelisDestacadas('tv',1)

scrollContainer.addEventListener("wheel", (evt) => {scrollContainer.scrollLeft += evt.deltaY;});