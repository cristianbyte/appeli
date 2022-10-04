const API_KEY = '531824c59374ba1968139fa7bcc652dc'
const IMG_URL = 'https://image.tmdb.org/t/p/w300'

async function traerPelisDestacadas(media_type='movie',time_window='day'){
    const res = await fetch(`https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=${API_KEY}&language=es`)
    const data = await res.json()
    console.log(data.results)

}

traerPelisDestacadas()