let movieOne = '';
let movieTwo
let movieInput = document.getElementById('movieOne')

// function to render a the data to the p
function renderData(data) {
  document.getElementById('movieAutocomplete').innerHTML = ''
  data.forEach(el => {
    let li = document.createElement('li')
    li.innerHTML = el.Title + '(' + el.Year + ')'

    let image = document.createElement('img')
    image.src = el.Poster

    // Need to make the li's clickable to add it to movie one and represent is on the left side of the page
    li.addEventListener("click", () => {
      movieOne = el
      loadOneMovie()
    })
    console.log(el)
    document.getElementById('movieAutocomplete').append(li)
  });
}

// function load the clicked movie on the screen
function addMovie(movie, ratingsArr) {
  document.getElementById('movieAutocomplete').innerHTML = ''
  // create elements to render on screen and then append them
  let titleP = document.createElement('p').innerText = movie.Title
  let yearP = document.createElement('p').innerText = movie.Year
  let metaScoreP = document.createElement('p').innerText = movie.Metascore
  let boxOfficeP = document.createElement('p').innerText = movie.BoxOffice
  let awardsP = document.createElement('p').innerText = movie.Awards
  
  document.getElementById('movieAutocomplete').append(
    titleP, yearP, metaScoreP, boxOfficeP, awardsP
  )

  let ratings = []
  ratingsArr.forEach((rating) => {
    let source = document.createElement('p').innnerText = rating.Source
    let value = document.createElement('p').innnerText = rating.Value

    document.getElementById('movieAutocomplete').append(source, value )
  })
}

// function to get all movies with those letters
async function listenChangeMovie(q) {
  console.log(q)
  // if the title is longer than 2 characters then fetch movies.
  if (q.length >= 2) {
    await fetch('http://www.omdbapi.com/?s=' + q + '&type=movie&plot=short&apikey=1d0fe65e').then((res) => {
      // the res.json(movieOne) didn't work because I didn't return the res = res.json() so data was undefined
      return res = res.json()
      // console.log(res)
    }).then((data) => {
      renderData(data.Search)
    }).catch((err) => {
      console.log(err);
    })
  }
}

// document.getElementById('movieOne').addEventListener("change", (event) => listenChangeMovie(event.target.value))
document.getElementById('movieOne').addEventListener('keydown', (e) => {
  if (e.key == "Enter") {
    loadOneMovie()
  }
})

// What do I need to render
// loop the Ratings to get the Source and Value within
// Metascore
// BoxOffice
// Awards

// function to search one Movie
async function loadOneMovie() {
  if (movieOne !== '') {
    await fetch("http://www.omdbapi.com/?t=" + movieOne.Title + "&y=" + movieOne.Year)
      .then((res) => {
        return res = res.json
      }).then((data) => {
        console.log(data);
        addMovie(data, data.Ratings)
      })
  } else {
    await fetch("http://www.omdbapi.com/?t=" + movieInput.value + "&plot=short&apikey=1d0fe65e")
      .then((res) => {
        return res = res.json()
      }).then((data) => {
        console.log(data);
        addMovie(data, data.Ratings)
      })
  }
}