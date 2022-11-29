window.addEventListener('hashchange',navigate)
const $ = (ref)=> document.querySelector(ref);

function navigate(){

    location.hash.startsWith('#movie=') ? movie(location.hash) :
    location.hash.startsWith('#tv=') ? console.log('movie') :
    location.hash.startsWith('#search=') ? console.log('movie') : home()

}
function home(){
    traerPelisDestacadas()
    traerPelisDestacadas('tv',1)
}
function movie(id){
    id = id.replace('#movie=','')
    getMovie(id)
}
function tv(id){
    return 0
}
function search(id){
    return 0
}

async function getMovie(id){
    // const res = await consult(`movie/${id}`)
    activeWindow.classList.add('active')
}

navigate()
const backButton = $('.aside__back')
const activeWindow = $('.aside')
backButton.addEventListener('click',()=>{
    location.hash = '#home'
    activeWindow.classList.remove('active')
})