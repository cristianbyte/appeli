// bad practice but, you know I want to see this app online in a simple way.
const API_KEY = '531824c59374ba1968139fa7bcc652dc'
const IMG_URL = 'https://image.tmdb.org/t/p/w300'
const scrollContainer = document.querySelector(".slide");
const load = document.querySelector('.load')

const lazyLoader = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting)   entry.target.setAttribute('src', entry.target.getAttribute('data-img'))
    })
});


async function consult(search, extra = ''){
    load.classList.add('loanding')
    //&query=thor&page=1&include_adult=false
    const res = await fetch(`https://api.themoviedb.org/3/${search}?api_key=${API_KEY}&language=es${extra}`)
    const data = await res.json()
    load.classList.remove('loanding')
    return data.results ?? data
}

async function consultaSlide(search='trending/movie/day',slidenum=0,extra=''){
    let movies = await consult(search,extra)
    if (movies.length == 0) movies = await consult(search.replace('recommendations','similar'))
    const media_type = search.includes('movie') ? 'movie' : 'tv'
    
    document.getElementsByClassName('slide')[slidenum].innerHTML=''
    movies.forEach(film => {
        
        const filmContainer = document.createElement('a')
        const filmImg = document.createElement('img')
        const filmTile = document.createElement('h4')
        const filmDate = document.createElement('div')
        filmContainer.classList.add('slide__peli')
        filmContainer.setAttribute('href', `#${media_type}=${film.id}`)
        filmImg.classList.add('slide__peli-img')
        if(film.poster_path == undefined){return}
        filmImg.setAttribute('data-img', IMG_URL + film.poster_path)
        filmTile.classList.add('slide__peli-titulo')
        filmTile.innerHTML = film.title ?? film.name
        filmDate.classList.add('slide__peli-date')
        filmDate.innerHTML = film.release_date ?? film.first_air_date
        
        lazyLoader.observe(filmImg)
        filmContainer.append(filmImg, filmTile, filmDate)
        document.getElementsByClassName('slide')[slidenum].appendChild(filmContainer)
    });

}

consultaSlide()
consultaSlide('trending/tv/day',1)
consultaSlide('/discover/movie',2)

scrollContainer.addEventListener("wheel", (evt) => {scrollContainer.scrollLeft += evt.deltaY;});