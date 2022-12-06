window.addEventListener('hashchange',navigate)
const $ = (ref)=> document.querySelector(ref);
const backButton = $('.aside__back')
const activeWindow = $('.aside')
const imgAside = $('.aside__main--img')
const titleAside = $('.aside__main--title')
const aboutAside = $('.aside__main--about')
const rateAside = $('.rate')
const starsAside = $(':root')
const descriptAside = $('.aside__main--descript')
const searchInput = $('#buscar')

function navigate(){
    location.hash.startsWith('#movie=') ? movie(location.hash) :
    location.hash.startsWith('#tv=') ? tv(location.hash) :
    location.hash.startsWith('#query=') ? search(location.hash) : location.hash = '#home'
}

async function movie(id){
    id = id.replace('#movie=','')
    activeWindow.classList.add('active')
    const res = await consult(`movie/${id}`)
    getFilm( res,`movie/${id}/recommendations`)
}
async function tv(id){
    id = id.replace('#tv=','')
    activeWindow.classList.add('active')
    const res = await consult(`tv/${id}`)
    getFilm(res,`tv/${id}/recommendations`)
}
async function search(id){
    id = id.replace('#','&')
    activeWindow.classList.add('active')
    const res = await consult(`search/multi`,`${id}&page=1&include_adult=false`)
    const resComplete = await consult(`${res[0].media_type}/${res[0].id}`) 
    getFilm(resComplete,`search/multi`,`${id}&page=1&include_adult=false`)
}

async function getFilm( res,ruta,extra){

    //here is a bad practice, i know it's just for time. :$
    consultaSlide(ruta,3,extra)

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
})