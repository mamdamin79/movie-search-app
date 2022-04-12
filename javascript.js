// selectors
const resultContainer = document.querySelector(".result-container");
const searchInput = document.querySelector(".search-input");
const searchList = document.querySelector(".search-list");


// global variables
let movieLoadedArray = [];


// event listeners
searchInput.addEventListener("keyup",(e) =>{
    let value = e.target.value.trim();
    if(value.length == 0){
        searchList.innerHTML = "";
        searchList.classList.remove("show")
    }
    else if(value.length > 3){
        movieLoader(value)

    }
    

})

// for get wich movie user clicked and render more info for it
searchList.addEventListener("click",(e)=>{
    //  First get clicked item id from DOM
    let omdbID =e.target.id
    // find clicked item object from movieLoadedArray        
    let clickedItem = movieLoadedArray.find(movie =>movie.imdbID === omdbID )
    console.log(clickedItem)
    // then generate more info section for it
    let html = `<div class="img-container">
                    <img src="${clickedItem.Poster}" alt="">
                </div>
                <div class="result-info">
                    <h3 class="movie-title">
                        ${clickedItem.Title}
                    </h3>
                    <ul>
                        <li class="year">year:${clickedItem.Year}</li>
                        <li class="rate">rating: pg-13 </li>
                        <li class="release">release:${Number(clickedItem.Year) +2}</li>
                    </ul>
                    <p class="genre"><b>Type:</b>${clickedItem.Type}</p>
                    <p class="writer"><b>imdbID:</b>${clickedItem.imdbID}</p>
                </div>`
                searchInput.value = ""
                searchList.innerHTML = ""
                searchList.classList.remove("show")
                resultContainer.innerHTML = html
})

// functios
// this function GET movies from api
async function movieLoader(value) {
    const res = await fetch(`https://omdbapi.com/?s=${value}&page=1&apikey=105c4b52`)
    const obj = await res.json();
    console.log(obj)
    if(obj.Response === "True") {
    searchList.classList.add("show")
    movieLoadedArray = [...obj.Search]
    // now generate dinamicly a container for EACH movie
    movieLoadedArray.map(movie=>{
        let html = `
            <div class="img-container">
                <img src="${movie.Poster}" alt="">
            </div>
            <div class="item-info">
                <h3>${movie.Title}</h3>
                <p class="release">${movie.Year}</p>
            </div>
            `
        let searchItem = document.createElement("div")
        searchItem.setAttribute("id",`${movie.imdbID}`)
        searchItem.classList.add("search-item")
        searchItem.innerHTML = html
        searchList.insertBefore(searchItem, searchList.firstChild)
    })}
    // if there is no movie in api for what user entered   
    if(obj.Response === "False"){
        searchList.classList.add("show")
        let html = `<p>${obj.Error}</p>` 
        searchList.innerHTML = html
    }

}

            

