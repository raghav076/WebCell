const searchFormDOM = document.querySelector('.search-form')
const searchInputDOM = document.querySelector('.search-input')
if(searchFormDOM) {
searchFormDOM.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log( window.location.href + `/search?q=${searchInputDOM.value}`)
    window.location.href += `?q=${searchInputDOM.value}`
})
}
