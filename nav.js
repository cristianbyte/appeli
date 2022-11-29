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

function navigate(){
    location.hash.startsWith('#movie=') ? movie(location.hash) :
    location.hash.startsWith('#tv=') ? tv(location.hash) :
    location.hash.startsWith('#search=') ? console.log('movie') : location.hash = '#home'
}

function movie(id){
    id = id.replace('#movie=','')
    getFilm( 'movie',id)
}
function tv(id){
    id = id.replace('#tv=','')
    getFilm('tv',id)
}
function search(id){
    return 0
}

async function getFilm( filmType,id){
    activeWindow.classList.add('active')
    const res = await consult(`${filmType}/${id}`)
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

backButton.addEventListener('click',()=>{
    location.hash = '#home'
    activeWindow.classList.remove('active')
})