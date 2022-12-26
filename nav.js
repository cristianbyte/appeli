window.addEventListener('hashchange',navigate)
const $ = (ref)=> document.querySelector(ref);
const backButton = $('.aside__back')
const likeButton = $('.aside__like')
const activeWindow = $('.aside')
const imgAside = $('.aside__main--img')
const titleAside = $('.aside__main--title')
const aboutAside = $('.aside__main--about')
const rateAside = $('.rate')
const starsAside = $(':root')
const descriptAside = $('.aside__main--descript')
const searchInput = $('#buscar')
// all data about the movie. -> res
let res 

function navigate(){
    location.hash.startsWith('#movie=') ? movie(location.hash) :
    location.hash.startsWith('#tv=') ? tv(location.hash) :
    location.hash.startsWith('#query=') ? search(location.hash) : location.hash = '#home'
}

async function movie(id){
    id = id.replace('#movie=','')
    activeWindow.classList.add('active')
    backButton.classList.add('active')
    likeButton.classList.add('active')
    localStorage.getItem(id) ? likeButton.classList.add('liked') : likeButton.classList.remove('liked')
    res = await consult(`movie/${id}`)
    getFilm( res,`movie/${id}/recommendations`)
}
async function tv(id){
    id = id.replace('#tv=','')
    activeWindow.classList.add('active')
    backButton.classList.add('active')
    likeButton.classList.add('active')
    localStorage.getItem(id) ? likeButton.classList.add('liked') : likeButton.classList.remove('liked')
    res = await consult(`tv/${id}`)
    getFilm(res,`tv/${id}/recommendations`)
}
async function search(id){
    id = id.replace('#','&')
    activeWindow.classList.add('active')
    likeButton.classList.add('active')
    backButton.classList.add('active')
    res = await consult(`search/multi`,`${id}&page=1&include_adult=false`)
    const resComplete = await consult(`${res[0].media_type}/${res[0].id}`) 
    getFilm(resComplete,`search/multi`,`${id}&page=1&include_adult=false`)
}

async function getFilm( res,ruta,extra){

    // scroll to top
    activeWindow.scrollTop = 0;

    //here is a bad practice, i know it's just for time. :$
    // slide de seccion favoritos: #4
    const numSlideSimilar = 4;
    consultaSlide(ruta,numSlideSimilar,extra)

    // background-image
    imgAside.src = `https://image.tmdb.org/t/p/w780${res.backdrop_path}`
    // title
    titleAside.innerHTML = res.title ?? res.name
    // about - genres & time
    aboutAside.innerHTML = ''
    res.genres.forEach( genre => {
        aboutAside.innerHTML += `${genre.name} `
    });

    if(res.runtime){
        aboutAside.innerHTML += `• ${res.runtime>60 ? Math.floor(res.runtime/60)+'h '+res.runtime%60 : res.runtime%60 }min` 
    } else{
        aboutAside.innerHTML += `• Episodes: ${res.number_of_episodes}`
    }
    // rate 
    rateAside.innerHTML = parseInt(res.vote_average * 10, 10) / 10
    // stars
    starsAside.style.setProperty('--rate', `${parseInt(res.vote_average * 10, 10)}%`);
    // description
    descriptAside.innerHTML = res.overview;

}

navigate()
function doInput(){
    location.hash = `#query=${searchInput.value}`
    searchInput.value=''
}
searchInput.addEventListener('keypress', (e)=>{
    e.keyCode == 13 ? doInput() : console.log('typing...')
})

backButton.addEventListener('click',()=>{
    location.hash = '#home'
    activeWindow.classList.remove('active')
    likeButton.classList.remove('active')
    backButton.classList.remove('active')
})

likeButton.addEventListener('click',()=>{
    likeButton.classList.toggle('liked')
    //film.media
    const dataLike = {
        'id':res.id,
        'title': res.title, 
        'poster_path': res.poster_path, 
        'release_date': res.release_date ?? res.first_air_date,
        'media': location.hash.startsWith('#movie') ? 'movie' : 'tv'
    }
    likeButton.classList.contains('liked') ? ( 
        localStorage.setItem(res.id, JSON.stringify(dataLike))) : localStorage.removeItem(res.id)

    console.log(localStorage)
})